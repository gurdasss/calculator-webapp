"use strict";

export class Lexer {
  #sequence = new Array();
  constructor(inputStream) {
    this.#sequence = this.#tokenization(inputStream);
    // reverse the array to peek and pop elements in constant time
    this.#sequence = this.#sequence.reverse();
  }

  #tokenization(inputStream) {
    // return if the input stream is empty
    if (!inputStream) return;

    return inputStream.split("").filter((char) => char !== " ");
  }

  peek() {
    if (!this.#sequence) return;
    return this.#sequence[this.#sequence.length - 1];
  }

  pop() {
    this.#sequence.pop();
  }
}
