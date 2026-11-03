import { afterEach, describe, expect, it, vi } from "vitest";
import { copyToClipboard, formatCSS, hexToRgb, rgbToHex } from "./clipboard";

const originalExecCommand = Object.getOwnPropertyDescriptor(
  document,
  "execCommand",
);

function mockExecCommand(implementation: () => boolean) {
  const mock = vi.fn(implementation);
  Object.defineProperty(document, "execCommand", {
    configurable: true,
    value: mock,
  });
  return mock;
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  if (originalExecCommand) {
    Object.defineProperty(document, "execCommand", originalExecCommand);
  } else {
    Reflect.deleteProperty(document, "execCommand");
  }
});

describe("copyToClipboard", () => {
  it("uses the Clipboard API in a secure context", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    vi.stubGlobal("isSecureContext", true);

    await expect(copyToClipboard("clipboard text")).resolves.toBeUndefined();
    expect(writeText).toHaveBeenCalledExactlyOnceWith("clipboard text");
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("propagates Clipboard API rejection", async () => {
    const error = new Error("Permission denied");
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(error) },
    });
    vi.stubGlobal("isSecureContext", true);

    await expect(copyToClipboard("text")).rejects.toBe(error);
  });

  it.each([
    { secure: true, clipboard: undefined },
    { secure: false, clipboard: { writeText: vi.fn() } },
  ])(
    "falls back when secure=$secure and clipboard=$clipboard",
    async ({ secure, clipboard }) => {
      vi.stubGlobal("navigator", { clipboard });
      vi.stubGlobal("isSecureContext", secure);
      const execCommand = mockExecCommand(() => {
        const textarea = document.querySelector("textarea");
        expect(textarea).toHaveValue("fallback text");
        expect(textarea).toHaveFocus();
        expect(textarea?.selectionStart).toBe(0);
        expect(textarea?.selectionEnd).toBe("fallback text".length);
        return true;
      });

      await expect(copyToClipboard("fallback text")).resolves.toBeUndefined();
      expect(execCommand).toHaveBeenCalledExactlyOnceWith("copy");
      expect(document.querySelector("textarea")).toBeNull();
    },
  );

  it("rejects and removes the temporary textarea when execCommand throws", async () => {
    vi.stubGlobal("navigator", { clipboard: undefined });
    const error = new Error("Copy failed");
    mockExecCommand(() => {
      throw error;
    });

    await expect(copyToClipboard("text")).rejects.toBe(error);
    expect(document.querySelector("textarea")).toBeNull();
  });
});

describe("formatCSS", () => {
  it("trims, indents and terminates nonempty rules", () => {
    expect(formatCSS(" color: red; ;\n margin: 0 ;")).toBe(
      "  color: red;\n  margin: 0;",
    );
    expect(formatCSS(" ; \n;")).toBe("");
  });
});

describe("hexToRgb", () => {
  it("parses six-digit colors with an optional hash and mixed case", () => {
    expect(hexToRgb("#Ff0080")).toEqual({ r: 255, g: 0, b: 128 });
    expect(hexToRgb("00ff01")).toEqual({ r: 0, g: 255, b: 1 });
  });

  it.each(["", "#fff", "#gg0000", "#12345678", " #123456"])(
    "rejects unsupported input %j",
    (input) => expect(hexToRgb(input)).toBeNull(),
  );
});

describe("rgbToHex", () => {
  it("returns lowercase six-digit hex including leading zeroes", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
    expect(rgbToHex(1, 15, 128)).toBe("#010f80");
  });
});
