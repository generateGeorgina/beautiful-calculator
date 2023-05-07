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
        // delete last value
        // value in currentOperand turn into a array of string and only copy all numbers but the last number and update currentOperand
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // only one decimal point is allowed
        // return keyword at the end of if statement's condition is valid syntax (without curly braces)
        if (number === '.' && this.currentOperand.includes('.')) return
        // convert number to string so 1 + 1 is '11' and not 2
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // if current operand is empty
        if (this.currentOperand === '') return
        // if previous operand has a value, then compute running total
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        // when an operation button is clicked, the operation and number goes to previous operand
        this.previousOperand = this.currentOperand
        // then current operand element is cleared
        this.currentOperand = ''
    }

    compute() {
        let computation
        // converts the previousOperand string into a number - which is assigned to prev
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // if prev or current is not a number (or is empty), exit function
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
                // U+00d7 - not "x" which is U+0078
            case '×':
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default:
                // for invalid operations
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        // get the first element of the array - integer before decimal point
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        // get second element of the array which is the decimal portion of the value
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            // no digits after the decimal point
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        // if the user entered digits after the decimal point
        if (decimalDigits != null ) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        // if there is an operation, update previous operand with operand and operation
        if (this.operation != null) {
           this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
        } else {
            // clears previous when equals sign is clicked
            this.previousOperandTextElement.innerText = ''
        }
        

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

// loop over operation buttons from querySelectorAll
operationButtons.forEach(button => {
    // add click event listener for each operation button
    button.addEventListener('click', () => {
        // append operation method from constructor to equal what ever text is inside the button
        calculator.chooseOperation(button.innerText)
        // update display method from constructor to refresh the display
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
// experimented using no parameters (button) - still works
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})