import { LINK_BDS_VERSIONS } from "./constants";

let task = fetch(LINK_BDS_VERSIONS);

const REQUESTED = process.env["INPUT_VERSION"];
console.log("REQUESTED VERSION: " + REQUESTED);
let response = await task;
console.log("RESPONSE: " + response.ok);
console.log(await response.json());