import { platform } from "os";

//#region src/constants.ts
const LINK_BDS_VERSIONS = "https://raw.githubusercontent.com/Bedrock-OSS/BDS-Versions/main/versions.json";
{
	let pf = platform();
	if (pf === "win32") pf = "win";
else if (pf !== "linux") throw new ReferenceError("Invalid operating system: " + pf);
}
const OS = platform() === "win32" ? "win" : "linux";

//#endregion
//#region src/main.ts
let task = fetch(LINK_BDS_VERSIONS);
const REQUESTED = process.env["INPUT_VERSION"];
console.log("REQUESTED VERSION: " + REQUESTED);
let response = await task;
console.log("RESPONSE: " + response.ok);
console.log(await response.json());

//#endregion