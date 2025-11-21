import { describe, it, expect } from "vitest";
import { Lexer } from "../src/Lexer.js";
import { Parser } from "../src/Parser.js";
import { Evaluator } from "../src/Evaluator.js";

const evalStr = (input) =>
  new Evaluator(new Parser(new Lexer(input))).getResult();

describe("Evaluator", () => {
  it("evaluates atoms", () => expect(evalStr("7")).toBe(7));

  it("handles basic ops", () => {
    expect(evalStr("(+ 5 3)")).toBe(8);
    expect(evalStr("(- 1 4)")).toBe(-3);
    expect(evalStr("(* 6 7)")).toBe(42);
    expect(evalStr("(/ 4 2)")).toBe(2);
  });

  it("handles deep nesting", () => {
    expect(evalStr("(* (+ 2 3) (- 2 1) 2)")).toBe(10);
  });

  it("handles full n-ary like a boss", () => {
    expect(evalStr("(+ 1 2 3 4 5 6 7 8 9)")).toBe(45);
    expect(evalStr("(* 1 2 3 4 5)")).toBe(120);
  });
});
