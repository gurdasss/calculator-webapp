"use strict";

class Expression {
  constructor(head, ...rest) {
    this.head = head;
    this.rest = rest;
  }
}

export class Parser {
  #lexerRef;
  #root;

  constructor(lexer) {
    // Objects or compound types are passed by modifiable reference value
    this.#lexerRef = lexer;
    this.#parseExpression();
  }

  getRoot() {
    return this.#root;
  }

  #parseExpression() {
    let symbol;
    let parentStack = new Array();
    while ((symbol = this.#lexerRef.peek())) {
      if (symbol == "(") {
        if (this.#root) parentStack.push(this.#root);
        this.#root = new Expression();
        this.#lexerRef.pop();
        // assuming that the next token will be an operator
        this.#root.head = this.#lexerRef.peek();
      } else if (/\d/.test(symbol)) {
        if (!this.#root) this.#root = +symbol;
        else this.#root.rest.push(+symbol);
      } else if (symbol == ")") {
        if (parentStack.length) {
          const currentRoot = this.#root;
          this.#root = parentStack.pop();
          this.#root.rest.push(currentRoot);
        }
      } else throw new Error(`Unexpected token: ${symbol}`);
      this.#lexerRef.pop();
    }
  }
}
