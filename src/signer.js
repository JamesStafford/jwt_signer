import jwt from "jsonwebtoken";
import fs from "fs";

export const MissingPayloadAndPrivateKeyError =
  "Payload and Private Key are required to sign a JWT";
export const MissingPayloadError = "Payload is required to sign a JWT";
export const MissingPrivateKeyError = "Private Key is required to sign a JWT";

export function sign(payload, privateKey) {
  if (!payload && !privateKey) {
    throw new Error(MissingPayloadAndPrivateKeyError);
  }

  if (!payload) {
    throw new Error(MissingPayloadError);
  }

  if (!privateKey) {
    throw new Error(MissingPrivateKeyError);
  }

  return jwt.sign(payload, privateKey);
}

export function main() {
  const fileSystem = fs;

  const pathToPayload = "data/payload.json";
  let payload = null;
  try {
    payload = fileSystem.readFileSync(pathToPayload);
  } catch(error) {
    throw `Failed to read data from payloadPath: "${pathToPayload}" with error: "${error.toString()}"`
  }

  const pathToPrivateKey = "data/privateKey.rem";
  let privateKey = null;
  try {
    privateKey = fileSystem.readFileSync(pathToPrivateKey);
  } catch(error) {
    throw `Failed to read data from pathToPrivateKey: "${pathToPrivateKey}" with error: "${error.toString()}"`
  }

  const signedJWT = sign(payload, privateKey);
  const pathToSignedToken = "data/signedToken.txt";
  try {
    fileSystem.writeFileSync(pathToSignedToken, signedJWT);
  } catch(error) {
      throw `Failed to write key to pathToSignedToken: "${pathToSignedToken}" with error: "${error.toString()}"`
  }
}
