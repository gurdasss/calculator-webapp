"use strict";

const foo = function () {
  const inputField = document.createElement("div");

  const expressionTextArea = document.createElement("textarea");
  expressionTextArea.setAttribute("name", "hhhh");
  expressionTextArea.setAttribute("id", "hhhh");

  const resultTextField = document.createElement("input");

  inputField.append(expressionTextArea);
  inputField.append(resultTextField);
  return inputField;
};

const mainContainer = document.querySelector(".main__container");

// mainContainer.append(foo());
