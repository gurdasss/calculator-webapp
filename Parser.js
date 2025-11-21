"use strict";

import { Lexer } from "./Lexer.js";

class Expression {
  constructor(head, ...rest) {
    this.head = head;
    this.rest = rest;
  }
}

class Parser {
  #lexerRef;
  #root;

  constructor(lexer) {
    // Objects or compound types are passed by modifiable reference value
    this.#lexerRef = lexer;
    this.#foo();
    console.log(this.#root);
  }

  #foo() {
    let symbol;
    let parentStack = new Array();
    const isDigit = (char) => /\d/.test(char);
    while ((symbol = this.#lexerRef.peek())) {
      if (symbol == "(") {
        if (this.#root) parentStack.push(this.#root);
        this.#root = new Expression();
        this.#lexerRef.pop();
        // assuming that the next token will be an operator
        this.#root.head = this.#lexerRef.peek();
      } else if (isDigit(symbol)) {
        if (!this.#root) this.#root = symbol;
        else this.#root.rest.push(symbol);
      } else if (symbol == ")") {
        if (parentStack.length) {
          const currentRoot = this.#root;
          this.#root = parentStack.pop();
          this.#root.rest.push(currentRoot);
        }
      }
      this.#lexerRef.pop();
    }
  }
}

console.log(new Parser(new Lexer("(+ 2 2 2 (* 2 5))")));
console.log(new Parser(new Lexer("(* 7 (+ 2 3) 8)")));
