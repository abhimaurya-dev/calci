const calci = {
  "+": (num1, num2) => {
    return parseFloat(num1) + parseFloat(num2);
  },
  "-": (num1, num2) => {
    return parseFloat(num1) - parseFloat(num2);
  },
  "*": (num1, num2) => {
    return parseFloat(num1) * parseFloat(num2);
  },
  "/": (num1, num2) => {
    return parseFloat(num1) / parseFloat(num2);
  },
  "^": (num1, num2) => {
    return parseFloat(num1) ** parseFloat(num2);
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
let expValue = document.querySelector(".exp");

let result = 0;
let exp = "";
let numberOfOperand = 0;
let numberOfOperator = 0;
let isPreviousOperator = true;
let expression = [];

const handleShowExp = () => {
  if (exp.length > 0) {
    // console.log(exp);
    expValue.classList.remove("exp-notValid");
    expValue.classList.add("exp-valid");
    expValue.innerHTML = exp;
    // outputValue.innerHTML =
    // exp.length === 1 ? "= " + outputValue.innerHTML : outputValue.innerHTML;
  } else {
    try {
      expValue.classList.remove("exp.valid");
    } finally {
      expValue.classList.add("exp-notValid");
    }
  }
};

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

const onClickHandler = (e) => {
  if (e === "clear") {
    result = 0;
    exp = "";
    expression = [];
    numberOfOperand = 0;
    numberOfOperator = 0;
    isPreviousOperator = true;
    outputValue.innerHTML = 0;
  } else if (e === "cancel") {
    exp = exp.substring(0, exp.length - 1);
    if (exp.length === 0) {
      outputValue.innerHTML = 0;
    }
    if (operators.includes(expression[expression.length - 1])) {
      expression.pop();
      result = infixToPostfix(expression);
      outputValue.innerHTML = exp.length >= 1 ? "= " + result : 0;
    } else {
      expression.pop();
    }
  } else if (e === "=") {
    outputValue.innerHTML = "= " + result;
  } else {
    if (
      operators.includes(expression[expression.length - 1]) &&
      expression[expression.length - 1] === e
    ) {
      return (outputValue.innerHTML = "error");
    }
    exp += e;
    // operators.includes(e) ? expression.push(e) : expression.push(parseFloat(e));
    // expression.push(e);
    if (
      !operators.includes(e) &&
      expression.length > 0 &&
      !operators.includes(expression[expression.length - 1])
    ) {
      expression[expression.length - 1] += e;
    } else {
      expression.push(e);
    }
    if (!operators.includes(expression[expression.length - 1])) {
      result = infixToPostfix(expression);
      console.log(expression);
      console.log(`result -> ${result}`);
      outputValue.innerHTML = "= " + result;
    }
  }

  handleShowExp();
};
