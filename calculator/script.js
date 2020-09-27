class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement, dotButton, deleteButton) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.dotButton = dotButton;
    this.deleteButton = deleteButton;
    this.readyToReset = false;
    this.hasError = false;
    this.equalsButtonClicked = false;
    this.deleteButton.disabled = false;
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
    if (operation === 'x n') {
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
        if (isNaN(computation)) {
          this.currentOperand = "Please enter the number > 0";
          this.hasError = true;
          this.operation = undefined;
          this.previousOperand = '';
          this.readyToReset = true;
          return;
        }
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.dotButton.disabled = false;
    this.deleteButton.disabled = true;
  }

  sqrt() {
    let computation;
    const current = parseFloat(this.currentOperand);
    if (current >= 0) {
      computation = Math.sqrt(current);
      this.currentOperand = computation;
    } else {
      this.currentOperand = "Please enter the number > 0";
      this.hasError = true;
    }
    this.readyToReset = true;
    this.operation = undefined;
    this.previousOperand = '';
    this.dotButton.disabled = false;
    this.deleteButton.disabled = true;
  }

  negateOperand() {
    if (this.currentOperand === '') {
      this.currentOperand = "Please enter the number first";
      this.hasError = true;
      this.readyToReset = true;
      return;
    }
    const current = - parseFloat(this.currentOperand);
    this.currentOperand = current;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    let decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      if (this.equalsButtonClicked && decimalDigits.length > 14) {
        decimalDigits = decimalDigits.substring(0, decimalDigits.length - 1).replace(/0*$/, "");
        this.equalsButtonClicked = false;
      }
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.hasError) {
      this.currentOperandTextElement.innerText = this.currentOperand;
      this.currentOperandTextElement.classList.toggle('error');
      this.previousOperandTextElement.innerText = this.previousOperand;
      return;
    }
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
const negateButton = document.querySelector('[data-negate]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement,
  dotButton, deleteButton);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.previousOperand === '' &&
      calculator.currentOperand != '' &&
      calculator.readyToReset) {
      calculator.currentOperand = ''
      calculator.readyToReset = false;
      deleteButton.disabled = false;
    }
    if (calculator.hasError) {
      calculator.hasError = false;
      calculator.currentOperandTextElement.classList.toggle('error');
    }
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
  deleteButton.disabled = false;
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
equalsButton.addEventListener('click', () => {
  calculator.equalsButtonClicked = true;
  calculator.compute();
  calculator.updateDisplay();
});
sqrtButton.addEventListener('click', () => {
  calculator.sqrt();
  calculator.updateDisplay();
});
negateButton.addEventListener('click', () => {
  calculator.negateOperand();
  calculator.updateDisplay();
});

const toggler = document.querySelector('[data-toggler]');
const directions = document.querySelector('[data-hidden]');

toggler.addEventListener('click', () => {
  directions.classList.toggle('hidden-directions');;
});