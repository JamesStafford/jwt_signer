import jwt from "jsonwebtoken";
import fs from "fs";

export const MissingPayloadAndPrivateKeyError =
  "Payload and Private Key are required to sign a JWT.";
export const MissingPayloadError = "Payload is required to sign a JWT.";
export const MissingPrivateKeyError = "Private Key is required to sign a JWT.";
export const MissingHeaderError = "Header is required to sign this JWT.";
export const MissingHeaderString =
  "A non-empty string is required to convert header string into JSON";

export function parseHeaderString(header) {
  if (!header) {
    throw new Error(MissingHeaderString);
  }

  try {
    return JSON.parse(header);
  } catch (e) {
    throw new Error(`Parsing Error: "${e.toString()}"`);
  }
}

export function sign(payload, privateKey, header) {
  if (!payload && !privateKey) {
    throw new Error(MissingPayloadAndPrivateKeyError);
  }

  if (!payload) {
    throw new Error(MissingPayloadError);
  }

  if (!privateKey) {
    throw new Error(MissingPrivateKeyError);
  }

  if (!header) {
    throw new Error(MissingHeaderError);
  }

  return jwt.sign(payload, privateKey, {
    header ,
  });
}

export function main() {
  const fileSystem = fs;

  const pathToHeader = "data/header.json";
  let header = null;
  try {
    header = parseHeaderString(fileSystem.readFileSync(pathToHeader));
  } catch (error) {
    throw `Failed to read data from pathToHeader: "${pathToHeader}" with error: "${error.toString()}"`;
  }

  const pathToPayload = "data/payload.json";
  let payload = null;
  try {
    payload = fileSystem.readFileSync(pathToPayload);
  } catch (error) {
    throw `Failed to read data from pathToPayload: "${pathToPayload}" with error: "${error.toString()}"`;
  }

  const pathToPrivateKey = "data/privateKey.rem";
  let privateKey = null;
  try {
    privateKey = fileSystem.readFileSync(pathToPrivateKey);
  } catch (error) {
    throw `Failed to read data from pathToPrivateKey: "${pathToPrivateKey}" with error: "${error.toString()}"`;
  }

  const signedJWT = sign(payload, privateKey, header);
  const pathToSignedToken = "data/signedToken.txt";
  try {
    fileSystem.writeFileSync(pathToSignedToken, signedJWT);
  } catch (error) {
    throw `Failed to write key to pathToSignedToken: "${pathToSignedToken}" with error: "${error.toString()}"`;
  }
}
