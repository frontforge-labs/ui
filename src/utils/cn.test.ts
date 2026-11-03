import { describe, expect, it } from "vitest";
import { cn } from "../index";

describe("cn", () => {
  it("merges conflicting Tailwind utilities, keeping the last value", () => {
    expect(cn("px-2 text-red-500", "px-4 text-blue-500")).toBe(
      "px-4 text-blue-500",
    );
    expect(cn("p-2", "px-4")).toBe("p-2 px-4");
  });

  it("ignores falsy inputs and supports conditional classes", () => {
    expect(
      cn("base", false, null, undefined, "", 0, ["nested"], {
        active: true,
        hidden: false,
      }),
    ).toBe("base nested active");
    expect(cn(false, null, undefined, "", 0)).toBe("");
    expect(cn()).toBe("");
  });
});
