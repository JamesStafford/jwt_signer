import jwt from "jsonwebtoken";
// const readline = require("readline");

// const payload = {};
// const privateKey = "";
//
// jwt.sign(payload, privateKey);

export const MissingPayloadAndPrivateKeyError = "Payload and Private Key are required to sign a JWT";
export const MissingPayloadError = "Payload is required to sign a JWT";
export const MissingPrivateKeyError = "Private Key is required to sign a JWT";

export function sign(payload, privateKey) {
    if (!payload && !privateKey) throw new Error(MissingPayloadAndPrivateKeyError);
    if (!payload) throw new Error(MissingPayloadError);
    if (!privateKey) throw new Error(MissingPrivateKeyError);
    return jwt.sign(payload, privateKey);
}
