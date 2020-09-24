class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement, dotButton) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.dotButton = dotButton;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.dotButton.disabled = false;
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand.toString().slice(-1) === '.') {
      this.dotButton.disabled = false;
    }
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number, button) {
    if (number === '.') {
      button.disabled = true;
    }
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (operation === 'x y') {
      operation = '^';
    }
    if (this.previousOperand != '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.dotButton.disabled = false;
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = previous + current;
        break;
      case '-':
        computation = previous - current;
        break;
      case '*':
        computation = previous * current;
        break;
      case '÷':
        computation = previous / current;
        break;
      case '^':
        computation = Math.pow(previous, current);
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.dotButton.disabled = false;
  }

  sqrt() {
    let computation;
    const current = parseFloat(this.currentOperand);
    computation = Math.sqrt(current);
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.dotButton.disabled = false;
  }

getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay;
  }
}

updateDisplay() {
  this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`;
  } else {
    this.previousOperandTextElement.innerText = '';
  }

}
}


const numberButtons = document.querySelectorAll('[data-number]');
const dotButton = document.querySelector('[data-dot]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const sqrtButton = document.querySelector('[data-sqrt]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, dotButton);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    



    calculator.appendNumber(button.innerText, button);
    calculator.updateDisplay();
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});
sqrtButton.addEventListener('click', () => {
  calculator.sqrt();
  calculator.updateDisplay();
});
