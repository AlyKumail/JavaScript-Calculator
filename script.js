class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOpearnd = "";
        this.previousOpearnd = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOpearnd = this.currentOpearnd.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === "." && this.currentOpearnd.includes(".")){
            return;
        }

        this.currentOpearnd = this.currentOpearnd.toString() + number;
        
    }

    chooseOpeartion(operation){
        if(this.currentOpearnd === "") return;

        if(this.previousOpearnd !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOpearnd = this.currentOpearnd;
        this.currentOpearnd = "";
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOpearnd);
        const current = parseFloat(this.currentOpearnd);
        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOpearnd = computation;
        this.operation = undefined;
        this.previousOpearnd = "";
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = "";
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }

        const floatNumber = parseFloat(number);
        if(isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText =  this.getDisplayNumber(this.currentOpearnd);

        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOpearnd)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = "";

        }

    }
}


const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const equalBtn = document.querySelector("[data-equal]");
const previousOperandTextElement = document.querySelector("[data-previous]");
const currentOperandTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberBtns.forEach(button =>{
    button.addEventListener("click",()=>{
        // console.log(button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationBtns.forEach(button =>{
    button.addEventListener("click",()=>{
        // console.log(button.innerText);
        calculator.chooseOpeartion(button.innerText);
        calculator.updateDisplay();
    })
});


equalBtn.addEventListener("click",()=>{
    // console.log(button.innerText);
    calculator.compute();
    calculator.updateDisplay();
})



allClearBtn.addEventListener("click",()=>{
    // console.log(button.innerText);
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener("click",()=>{
    // console.log(button.innerText);
    calculator.delete();
    calculator.updateDisplay();
})
