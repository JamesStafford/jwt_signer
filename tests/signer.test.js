import {
  MissingHeaderError, MissingHeaderString,
  MissingPayloadAndPrivateKeyError,
  MissingPayloadError,
  MissingPrivateKeyError, parseHeaderString,
  sign,
} from "../src/signer";

jest.mock("jsonwebtoken", () => ({
  sign: () => "",
}));

const payloadPlaceholder = { isPlaceholder: true };
const keyPlaceholder = "key placeholder";
const headerPlaceholder = {sid: "a88da4a77a27511b7a6850e1d359aaf2"};
const headerStringPlaceholder = '{"sid": "a88da4a77a27511b7a6850e1d359aaf2"}';

describe("For Signer, ", () => {
  describe("Testing Signing, ", () => {
    test("Verify signer returns a value when provided payload and key.", () => {
      expect(sign(payloadPlaceholder, keyPlaceholder, headerPlaceholder)).toBe("");
    });

    test("Verify signer throws an error no parameters are not provided", () => {
      expect(() => sign()).toThrow(MissingPayloadAndPrivateKeyError);
    });

    test("Verify signer throws an error when payload is falsey", () => {
      const emptyPayloadPlaceholder = null;
      expect(() => sign(emptyPayloadPlaceholder, keyPlaceholder, headerPlaceholder)).toThrow(
        MissingPayloadError
      );
    });

    test("Verify signer throws an error when key is not provided", () => {
      const emptyKeyPlaceholder = "";
      expect(() => sign(payloadPlaceholder, emptyKeyPlaceholder, headerPlaceholder)).toThrow(
        MissingPrivateKeyError
      );
    });

    test("Verify signer throws an error when header is not provided", () => {
      const emptyHeaderPlaceholder = "";
      expect(() => sign(payloadPlaceholder, keyPlaceholder, emptyHeaderPlaceholder)).toThrow(
          MissingHeaderError
      );
    });

    test("Verify signer throws an error when payload and key are not falsey", () => {
      const emptyPayloadPlaceholder = null;
      const emptyKeyPlaceholder = "";
      expect(() => sign(emptyPayloadPlaceholder, emptyKeyPlaceholder)).toThrow(
        MissingPayloadAndPrivateKeyError
      );
    });
  });
  describe("Testing Parsing Header String, ", () => {
      test("Verify that parseHeaderString runs successfully.", () => {
        expect(() => parseHeaderString(headerStringPlaceholder)).not.toThrow();
      });

      test("Verify that parseHeaderString expects a non-empty string", () => {
          expect(() => parseHeaderString("")).toThrow(MissingHeaderString);
      });

    test("Verify that parseHeaderString returns a json matching the provided string.", () => {
      expect(parseHeaderString(headerStringPlaceholder)).toStrictEqual({
        sid: "a88da4a77a27511b7a6850e1d359aaf2",
      });
    });

    test("Verify that parseHeaderString throws an error if invalid json stirng is provided.", () => {
      expect(() => parseHeaderString("{invalid}")).toThrow("Parsing Error: \"SyntaxError: Unexpected token i in JSON at position 1\"");
    });
  })
});
