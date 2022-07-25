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

    }
    //to display the number clicked in
    appendNumber(number) {
        if (number ==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    //to choose on the operation clicked on
    chooseOperation(operation) {
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    //to be able to coomputer what is given to the calculator
    compute() {

    }
    //to be able to update the numbers and output on a screen
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.currentOperand
    }
}



//using data attributes to be able to select our JavaSCript elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
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
