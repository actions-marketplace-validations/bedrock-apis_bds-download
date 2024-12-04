import {platform} from "node:os";
import { exit } from "node:process";

export const LINK_BDS_VERSIONS = "https://raw.githubusercontent.com/Bedrock-OSS/BDS-Versions/main/versions.json";
export const LINK_BDS_CDN = `https://www.minecraft.net/bedrockdedicatedserver`;
export const OS = platform();
export const REQUESTED_VERSION = process.env["INPUT_VERSION"];
export const USE_PREVIEW = process.env["INPUT_USE-PREVIEW"]?.toLocaleLowerCase() === "true";
export const OUT_DIR = process.env["INPUT_OUT-DIR"];