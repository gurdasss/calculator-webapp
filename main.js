// /^(\d+)[+-/*](\d+)$/
// /^-?(\d+(\.\d+)?)[+-/*]-?(\d+(\.\d+)?)$/

const exp1 = "(+ 2 5 6)"; // (2 + 5) + 6 = 13
const exp2 = "(- 2 5 6)"; // (2 - 5) - 6 = -9
const exp3 = "(* 2 5 6)"; // (2 * 5) * 6 = 60
const exp4 = "(/ 2 5 6)"; // (2 / 5) / 6 ≈ 0.67
// Left -> Right associativity
// Inside -> Outside
// Prefix notation and their is no need for operator precedence
// Checkout SICP for implementing parser
// after evaluating each expression the parser should return a "rational" object
// I need to use recursion and LIFO data structure for this

function foo(exp) {
  let i = 0;
  while (i < exp.length) {
    console.log(exp[i++]);
  }
}

foo(exp1);
