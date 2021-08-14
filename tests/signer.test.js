import {
  MissingPayloadAndPrivateKeyError,
  MissingPayloadError,
  MissingPrivateKeyError,
  sign,
} from "../src/signer";

jest.mock("jsonwebtoken", () => ({
  sign: () => "",
}));

const payloadPlaceholder = { isPlaceholder: true };
const keyPlaceholder = "key placeholder";

describe("For Signer, ", () => {
  test("Signer returns a value when provided payload and key.", () => {
    expect(sign(payloadPlaceholder, keyPlaceholder)).toBe("");
  });

  test("Signer throws an error no parameters are not provided", () => {
    expect(() => sign()).toThrow(MissingPayloadAndPrivateKeyError);
  });

  test("Signer throws an error when payload is falsey", () => {
    const emptyPayloadPlaceholder = null;
    expect(() => sign(emptyPayloadPlaceholder, keyPlaceholder)).toThrow(
      MissingPayloadError
    );
  });

  test("Signer throws an error when key is not provided", () => {
    const emptyKeyPlaceholder = "";
    expect(() => sign(payloadPlaceholder, emptyKeyPlaceholder)).toThrow(
      MissingPrivateKeyError
    );
  });

  test("Signer throws an error when payload and key are not falsey", () => {
    const emptyPayloadPlaceholder = null;
    const emptyKeyPlaceholder = "";
    expect(() => sign(emptyPayloadPlaceholder, emptyKeyPlaceholder)).toThrow(
      MissingPayloadAndPrivateKeyError
    );
  });
});
