"use strict";

import { Parser } from "./Parser.js";
import { Lexer } from "./Lexer.js";

class Evaluator {
  #root;
  #result;
  constructor(parser) {
    this.#root = parser.getRoot();
    this.#result = Evaluator.#evaluate(this.#root);
  }

  getResult() {
    return this.#result;
  }

  static #getOperatorFunction(op) {
    switch (op) {
      case "+":
        return (a, b) => a + b;
      case "-":
        return (a, b) => a - b;
      case "*":
        return (a, b) => a * b;
      case "/":
        return (a, b) => a / b;
      default:
        throw new Error(`Invalid operator: ${symbol}`);
    }
  }

  static #evaluate(expression) {
    if (!expression) return 0;
    if (typeof expression === "number") return expression;

    let operator = Evaluator.#getOperatorFunction(expression.head);

    return expression.rest.flatMap(Evaluator.#evaluate).reduce(operator);
  }
}

console.log(
  new Evaluator(new Parser(new Lexer("(* 7 (+ 2 3) 8)"))).getResult()
);
// → 7 * (2 + 3) * 8 = 280

console.log(
  new Evaluator(new Parser(new Lexer("(+ 1 2 3 4 5 (* 1 2))"))).getResult()
);
// → 1+2+3+4+5+200 = 215

console.log(new Parser(new Lexer("(+ 1 2 3 4 5 (* 1 2))")).getRoot().rest);
