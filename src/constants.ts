import {platform} from "os";

export const LINK_BDS_VERSIONS = "https://raw.githubusercontent.com/Bedrock-OSS/BDS-Versions/main/versions.json";
export const LINK_BDS_CDN = `https://www.minecraft.net/bedrockdedicatedserver`;
{
    let pf = platform() as string;
    if(pf === "win32") pf = "win";
    else if(pf !== "linux") throw new ReferenceError("Invalid operating system: " + pf);
}
export const OS = platform() === "win32"?"win":"linux";