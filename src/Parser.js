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
    this.#root = this.#parseExpression(null);
  }

  getRoot() {
    return this.#root;
  }

  #parseExpression(root) {
    let symbol;

    while ((symbol = this.#lexerRef.peek())) {
      if (symbol == "(") {
        this.#lexerRef.pop();
        if (root) {
          const subExpression = new Expression();
          // assuming that the next token will be an operator
          subExpression.head = this.#lexerRef.peek();
          this.#lexerRef.pop();
          root.rest.push(this.#parseExpression(subExpression));
          continue;
        }
        root = new Expression();
        // assuming that the next token will be an operator
        root.head = this.#lexerRef.peek();
      } else if (/\d/.test(symbol)) {
        if (!root) return +symbol;
        root.rest.push(+symbol);
      } else if (symbol == ")") {
        this.#lexerRef.pop();
        return root;
      } else throw new Error(`Unexpected token: ${symbol}`);

      this.#lexerRef.pop();
    }

    return root;
  }

  // #parseExpression() {
  //   let symbol;
  //   let parentStack = new Array();
  //   while ((symbol = this.#lexerRef.peek())) {
  //     if (symbol == "(") {
  //       if (this.#root) parentStack.push(this.#root);
  //       this.#root = new Expression();
  //       this.#lexerRef.pop();
  //       // assuming that the next token will be an operator
  //       this.#root.head = this.#lexerRef.peek();
  //     } else if (/\d/.test(symbol)) {
  //       if (!this.#root) this.#root = +symbol;
  //       else this.#root.rest.push(+symbol);
  //     } else if (symbol == ")") {
  //       if (parentStack.length) {
  //         const currentRoot = this.#root;
  //         this.#root = parentStack.pop();
  //         this.#root.rest.push(currentRoot);
  //       }
  //     } else throw new Error(`Unexpected token: ${symbol}`);
  //     this.#lexerRef.pop();
  //   }
  // }
}
