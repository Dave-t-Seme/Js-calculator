//to store what is inputed and also the operations keyed  in
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    //to clear up our different variables
    clear() {
        this.currentOperand= ''
        this.previousOperand = ''
        this.operation = undefined
    }
    //to delete
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    //to display the number clicked in
    appendNumber(number) {
        if (number ==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    //to choose on the operation clicked on
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    //to be able to coomputer what is given to the calculator
    compute() {
        let computation
        const previous =parseFloat(this.previousOperand)
        const current =parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = previous + current
                break
            
            case '-':
                computation = previous - current
                break
            
            case 'x':
                computation = previous * current
                break
            
            case '÷':
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    //to convert a number toa dispaly value ie 3,333,499,499,127.49
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en' , {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDigits}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    //to be able to update the numbers and output on a screen
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        //to be able to display the operations 
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
      
    }
}

 
//using data attributes to be able to select our JavaSCript elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//making variables update on our calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
//so as to display anything(number) typed on the calculator
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //to disaplay the number clicked
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
 //so as to display the operations

 operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
})

//so as to enable the calculator to compute some functions
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//to make the all clear button functionable
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// to make the delete button functionable
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})