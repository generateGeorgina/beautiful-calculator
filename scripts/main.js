class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        // to set all default values
        this.clear()
    }

    clear() {
        // clear to empty string
        this.currentOperand = ''
        this.previousOperand = ''
        // operation default value
        this.operation = undefined
    }

    delete() {

    }

    appendNumber(number) {
        // only one decimal point is allowed
        if (number === '.' && this.currentOperand.includes('.')) return
        // convert number to string so 1 + 1 is '11' and not 2
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


// create an instance of the Calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// loop over each number in array from querySelectorAll
numberButtons.forEach(button => {
    // add click event listener for each number button
    button.addEventListener('click', () => {
        // apeend number method from constructor to equal what ever text is inside the button
        calculator.appendNumber(button.innerText)
        // update display method from constructor to refresh the display with new number
        calculator.updateDisplay()
    })
})