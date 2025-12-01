"use strict";

import { TerminalUI } from "./TerminalUI.js";
import { Lexer } from "./Lexer.js";
import { Parser } from "./Parser.js";
import { Evaluator } from "./Evaluator.js";

function evaluate(expr) {
  return new Evaluator(new Parser(new Lexer(expr))).getResult();
}

/* Auto-instantiate after DOM is ready (defer-safe approach when script is loaded with defer) */
document.addEventListener("DOMContentLoaded", () => {
  try {
    // default shell selector is '#shell' to match your HTML
    new TerminalUI("#shell");
    //
    window.evaluateExpression = function (expr, callback) {
      callback(evaluate(expr), false);
    };
  } catch (err) {
    // keep failure visible in console
    // eslint-disable-next-line no-console
    console.error("Failed to initialize TerminalUI:", err);
  }
});