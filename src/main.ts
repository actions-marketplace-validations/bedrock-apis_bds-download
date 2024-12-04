import { exit } from "node:process";
import { LINK_BDS_CDN, LINK_BDS_VERSIONS, OS, OUT_DIR, REQUESTED_VERSION, USE_PREVIEW } from "./constants";
import { Extract } from "unzip-stream";
import { pipeline } from "node:stream/promises";

async function main(): Promise<number>{
    // Start the fetch for BDS Versions
    const response = await fetch(LINK_BDS_VERSIONS);
    
    // Check validity of the platform
    if(OS !== "win32" && OS !== "linux"){
        console.error("Unsupported operating system: " + OS);
        return -1;
    }
    
    // Check if the response is right
    if(!response.ok) {
        console.error("Failed to fetch bds versions!");
        return -1;
    }
    
    
    const SYSTEM = OS === "win32"?"windows":OS;
    const {
        [SYSTEM]: {
            [USE_PREVIEW?"preview":"stable"]: LATEST,
            [USE_PREVIEW?"preview_versions":"versions"]: VERSIONS
        }
    } = await response.json();

    let version: string = REQUESTED_VERSION??"latest";
    
    // Check for latest case
    if(version === "latest") version = LATEST;

    // Check for version validity
    if(!isValidVersion(version)){
        console.error("Unknown version format: " + version);
        return -1;
    }

    // https://www.minecraft.net/bedrockdedicatedserver/bin-win-preview/bedrock-server-1.21.60.22.zip
    const LINK = `${LINK_BDS_CDN}/bin-${OS === "win32"?"win":OS}${USE_PREVIEW?"-preview":""}bedrock-server-${version}.zip`;
    const BDS_STREAM = await fetch(LINK);

    // Check for stream validity
    if(!BDS_STREAM.ok){
        console.error("CDN file not found: " + LINK);
        return -1;
    }

    // Start resolving the stream
    await pipeline(
      BDS_STREAM.body as any,
      Extract({path: OUT_DIR??"bds_bin"}) as any
    );

    // Return as successful
    return 0;
};


main().then(exit, e=>{console.error(e, e.stack); exit(-1);});

function isValidVersion(version: string): boolean {
    // Split the version string by dots
    const segments = version.split('.');

    if(segments.length !== 4) return false;

    // Check if all segments are valid numbers
    for (const segment of segments) {
        const num = parseInt(segment, 10);
        if (!isFinite(num) || num < 0) {
            return false;
        }
    }

    return true;
}