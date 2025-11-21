import { describe, it, expect } from "vitest";
import { Lexer } from "../src/Lexer.js";
import { Parser } from "../src/Parser.js";

describe("Parser", () => {
  const parse = (input) => new Parser(new Lexer(input)).getRoot();

  it("parses single digit", () => {
    expect(parse("5")).toBe(5);
  });

  it("parses simple binary", () => {
    const expr = parse("(+ 3 4)");
    expect(expr.head).toBe("+");
    expect(expr.rest).toEqual([3, 4]);
  });

  it("parses nested with n-ary", () => {
    const expr = parse("(* 7 (+ 2 3) 8)");
    expect(expr.head).toBe("*");
    expect(expr.rest[0]).toBe(7);
    expect(expr.rest[1].head).toBe("+");
    expect(expr.rest[1].rest).toEqual([2, 3]);
    expect(expr.rest[2]).toBe(8);
  });

  it("supports full n-ary operators", () => {
    const expr = parse("(+ 1 2 3 4 5)");
    expect(expr.head).toBe("+");
    expect(expr.rest).toEqual([1, 2, 3, 4, 5]);
  });
});
