// terminal-ui.js
"use strict";

/**
 * TerminalUI
 *
 * Minimal terminal-style UI that:
 *  - creates an input row
 *  - on Enter converts the input to a read-only command-line and appends a result placeholder
 *  - calls window.evaluateExpression(expr, callback) OR uses the returned Promise to render the output
 *  - exposes window.terminalUI.pushLine(prefill)
 *
 * This preserves the behavior of your previous implementation.
 */
export class TerminalUI {
  /**
   * @param {string|HTMLElement} shell - selector (e.g. '#shell') or DOM element for the shell container
   */
  constructor(shell = "#shell") {
    this.shell =
      typeof shell === "string" ? document.querySelector(shell) : shell;

    if (!this.shell) {
      throw new Error("TerminalUI: shell element not found.");
    }

    // current interactive entry (object with { entry, input })
    this.currentEntry = null;
    this.currentInput = null;

    // wire events and create initial input
    this._bindEventHandlers();
    const first = this._createInputRow();
    this.currentEntry = first.entry;
    this.currentInput = first.input;
  }

  /* ----------------------------
     DOM creation helpers
     ---------------------------- */

  /**
   * Create and focus an input row.
   * @param {string} prefill
   * @returns {{entry: HTMLElement, input: HTMLInputElement}}
   */
  _createInputRow(prefill = "") {
    const entry = document.createElement("div");
    entry.className = "entry";

    const inputRow = document.createElement("div");
    inputRow.className = "input-row";

    const prompt = document.createElement("div");
    prompt.className = "prompt";
    prompt.textContent = ">";

    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.placeholder = "Enter Lisp expression or command...";
    input.value = prefill;

    inputRow.appendChild(prompt);
    inputRow.appendChild(input);
    entry.appendChild(inputRow);
    this.shell.appendChild(entry);

    // ensure newest input is visible and focused
    input.scrollIntoView({ block: "nearest" });
    input.focus();

    return { entry, input };
  }

  /**
   * Replace transient input row with read-only command line and append a result placeholder.
   * @param {HTMLElement} entry
   * @param {string} userText
   * @returns {HTMLElement} resultElement
   */
  _finalizeEntry(entry, userText) {
    const inputRow = entry.querySelector(".input-row");
    if (inputRow) entry.removeChild(inputRow);

    const commandLine = document.createElement("div");
    commandLine.className = "command-line";

    const prompt = document.createElement("div");
    prompt.className = "prompt";
    prompt.textContent = ">";

    const text = document.createElement("div");
    text.className = "text";
    text.textContent = userText;

    commandLine.appendChild(prompt);
    commandLine.appendChild(text);
    entry.appendChild(commandLine);

    const result = document.createElement("div");
    result.className = "result";
    result.textContent = "[evaluating...]";
    entry.appendChild(result);

    // scroll to show result
    result.scrollIntoView({ block: "nearest" });
    return result;
  }

  /* ----------------------------
     Evaluator integration
     ---------------------------- */

  /**
   * Evaluate expression and render into resultElement.
   * Supports callback-style and promise-style window.evaluateExpression.
   *
   * @param {string} expr
   * @param {HTMLElement} resultElement
   */
  _evaluateAndRender(expr, resultElement) {
    const render = (out, isError = false) => {
      resultElement.textContent = out;
      if (isError) resultElement.classList.add("error");
      else resultElement.classList.remove("error");
    };

    try {
      if (typeof window.evaluateExpression === "function") {
        // callback-style support
        const maybe = window.evaluateExpression(expr, (out, isError) => {
          render(String(out ?? ""), Boolean(isError));
        });

        // if a Promise is returned, render its resolution
        if (maybe && typeof maybe.then === "function") {
          maybe
            .then((res) => render(String(res ?? "")))
            .catch((err) => render(String(err ?? "Evaluation error"), true));
        }
      } else {
        render(
          "[No evaluator found. Provide window.evaluateExpression(expr, callback) to plug in your interpreter]"
        );
      }
    } catch (err) {
      render(String(err || "Evaluation error"), true);
    }
  }

  /* ----------------------------
     Event wiring
     ---------------------------- */

  _bindEventHandlers() {
    // Delegated keydown handler on the shell:
    // only acts when Enter is pressed inside an element with class '.input'
    this.shell.addEventListener("keydown", (e) => {
      const target = e.target;
      if (!target || !target.classList || !target.classList.contains("input")) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const text = target.value.trim();

        // Blank input -> just add a fresh input row
        if (text === "") {
          const next = this._createInputRow();
          this.currentEntry = next.entry;
          this.currentInput = next.input;
          return;
        }

        // Finalize the current entry and evaluate
        const resultElement = this._finalizeEntry(this.currentEntry, text);
        this._evaluateAndRender(text, resultElement);

        // Append a fresh input row and focus it
        const next = this._createInputRow();
        this.currentEntry = next.entry;
        this.currentInput = next.input;

        // ensure shell scrolled to bottom
        this.shell.scrollTop = this.shell.scrollHeight;
      }
    });

    // Clicking the shell focuses the newest input (common UX)
    this.shell.addEventListener("click", () => {
      const lastInput = this.shell.querySelector(".entry:last-child .input");
      if (lastInput) lastInput.focus();
    });

    // expose the minimal API (kept here so behavior remains identical)
    window.terminalUI = {
      pushLine: (prefill = "") => {
        const next = this._createInputRow(prefill);
        this.currentEntry = next.entry;
        this.currentInput = next.input;
      },
    };
  }
}
