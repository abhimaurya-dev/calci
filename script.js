const calci = {
  "+": (num1, num2) => {
    return num1 + num2;
  },
  "-": (num1, num2) => {
    return num1 - num2;
  },
  "*": (num1, num2) => {
    return num1 * num2;
  },
  "/": (num1, num2) => {
    return num1 / num2;
  },
  "^": (num1, num2) => {
    return num1 ** num2;
  },
};

const operators = ["+", "-", "*", "/", "^"];

const associativityAndPrecedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 3,
};

let outputValue = document.querySelector(".output-value");

let result = 0;
let exp = "";
let numberOfOperand = 0;
let numberOfOperator = 0;
let isPreviousOperator = true;
let expression = [];

const evaluatePostfix = (exp) => {
  let operand = [];
  exp.forEach((e) => {
    if (operators.includes(e)) {
      let temp1 = operand.pop();
      let temp2 = operand.pop();
      operand.push(calci[e](temp2, temp1));
    } else {
      operand.push(e);
    }
  });
  return operand[0];
};

const infixToPostfix = (exp) => {
  let postfixExp = [];
  let operator = [];
  exp.forEach((e) => {
    if (operators.includes(e)) {
      if (operator.length === 0) operator.push(e);
      else {
        if (
          associativityAndPrecedence[e] >
          associativityAndPrecedence[operator[operator.length - 1]]
        ) {
          operator.push(e);
        } else {
          while (
            associativityAndPrecedence[e] <=
            associativityAndPrecedence[operator[operator.length - 1]]
          ) {
            let temp = operator.length >= 0 ? operator.pop() : "";
            postfixExp.push(temp);
          }
          operator.push(e);
        }
      }
    } else {
      postfixExp.push(e);
    }
  });
  while (operator.length) {
    postfixExp.push(operator.pop());
  }
  return evaluatePostfix(postfixExp);
};

const showExpression = (exp) => {
  console.log(exp);
  let expressionString = "";
  exp.forEach((e) => expressionString + e.toString());
  console.log(expressionString);
  return expressionString;
};

const onClickHandler = (e) => {
  if (e === "clear") {
    result = 0;
    exp = "";
    expression = [];
    numberOfOperand = 0;
    numberOfOperator = 0;
    isPreviousOperator = true;
    outputValue.innerHTML = result;
  } else if (e === "=") {
    outputValue.innerHTML = result;
  } else {
    // if (e === "%") {
    //   expression[expression.length - 1] /= 100;
    //   console.log(expression);
    //   result = infixToPostfix(expression);
    // }
    if (operators.includes(e) && isPreviousOperator === false) {
      numberOfOperator++;
      expression.push(parseFloat(exp));
      exp = "";
      expression.push(e);
      isPreviousOperator = true;
    } else if (!operators.includes(e) && isPreviousOperator === true) {
      numberOfOperand++;
      isPreviousOperator = false;
    }
    if (!operators.includes(e)) exp += e;
    if (
      numberOfOperand > numberOfOperator &&
      numberOfOperand !== 0 &&
      numberOfOperator !== 0
    ) {
      if (exp !== "") expression.push(parseFloat(exp));
      result = infixToPostfix(expression);
      if (exp !== "") expression.pop();
    }
    outputValue.innerHTML === "0"
      ? (outputValue.innerHTML = e)
      : (outputValue.innerHTML += e);
  }
};
