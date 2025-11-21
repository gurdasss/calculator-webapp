"use strict";
// import { printHello } from "./parser.js";

let mostRecentInput = null;

const setCommonInputFieldAttributes = function (
  className,
  id,
  name,
  placeholder
) {
  const inputField = document.createElement("input");
  inputField.setAttribute("class", className);
  inputField.setAttribute("placeholder", placeholder);
  inputField.setAttribute("id", id);
  inputField.setAttribute("name", name);

  return inputField;
};

const setExpressionField = function (id, className) {
  const expressionField = setCommonInputFieldAttributes(
    className,
    id,
    id,
    "(+ 2 2)"
  );
  expressionField.addEventListener("keypress", function (e) {
    if (!(e.key == "Enter")) return;

    const userInput = this.value.trim();

    if (!userInput) {
      this.style.borderColor = "red";
      return;
    }

    this.style.borderColor = "green";
    mostRecentInput = this.value;

    console.log(this.value);
    this.disabled = true;
  });
  return expressionField;
};

const setResultField = function (id, className) {
  const resultField = setCommonInputFieldAttributes(className, id, id, "4");
  resultField.setAttribute("readonly", "");

  return resultField;
};

const mainContainer = document.querySelector("main");

for (let i = 0; i < 100; ++i) {
  const expressionField = setExpressionField(
    `Expression ${i}`,
    "main__expression-field"
  );

  const resultField = setResultField(`Result ${i}`, "main__result-field");

  mainContainer.append(expressionField);
  mainContainer.append(resultField);
}