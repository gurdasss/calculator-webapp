"use strict";

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
  expressionField.setAttribute("required", "");
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
