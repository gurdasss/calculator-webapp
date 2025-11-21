import { describe, it, expect } from "vitest";
import { Lexer } from "../src/Lexer.js";

describe("Lexer", () => {
  it("removes whitespace and splits correctly", () => {
    const lexer = new Lexer(" ( *   7 (+ 2 3 ) 8 ) ");
    expect(lexer.getSequence()).toEqual([
      ")",
      "8",
      ")",
      "3",
      "2",
      "+",
      "(",
      "7",
      "*",
      "(",
    ]);
  });
});
