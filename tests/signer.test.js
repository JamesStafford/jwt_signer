import * as mockProcess from "jest-mock-process";

import {
    MissingPayloadAndPrivateKeyError,
    MissingPayloadError,
    MissingPrivateKeyError, processUserInput, PromptForPayloadFilePath,
    sign,
} from "../src/signer";


jest.mock("jsonwebtoken", () => ({
  sign: () => "",
}));

const payloadPlaceholder = { isPlaceholder: true };
const keyPlaceholder = "key placeholder";

describe("For Signer, ", () => {
  describe("Testing Signing, ", () => {
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

  describe("Testing Handling User Input, ", () => {
    test("Verify that processUserInput method exists.", () => {
        expect(() => processUserInput()).not.toThrow();
    });

    test("Receive object from processUserInput.", () => {
        expect(processUserInput()).toStrictEqual({
            payloadPlaceholder: {},
            keyPlaceholder: ""
        });
    });

    test("User is requested to enter filepath for payload.", () => {
        const mockedStdOut = mockProcess.mockProcessStdout();
        processUserInput();
        expect(mockedStdOut).toHaveBeenCalledWith(PromptForPayloadFilePath);
    });
  });
});
