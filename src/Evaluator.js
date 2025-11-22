"use strict";

export class Evaluator {
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
        throw new Error(`Unknown operator: ${op}`);
    }
  }

  static #evaluate(expression) {
    if (!expression) return 0;
    if (typeof expression === "number") return expression;

    let operator = Evaluator.#getOperatorFunction(expression.head);

    return expression.rest.flatMap(Evaluator.#evaluate).reduce(operator);
  }
}
