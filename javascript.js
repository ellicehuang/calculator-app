const numberButtons = document.querySelectorAll('.num');
const funcButtons = document.querySelectorAll('button.func');
const opButtons = document.querySelectorAll('button.ops');

const operationText = document.querySelector('.operation-text');
const viewportText = document.querySelector('.viewport-text');

let num1;
let operator;
let num2;
let result;
// let cleared = false;

function roundNumber(num) {
    return num.toExponential(2);
}

function updateDisplay(text) {
    if (String(text).length > 8) text = roundNumber(Number(text))
    if (text === `:( \u00A0`) viewportText.style.fontSize = '36px';
    viewportText.style.fontSize = '60px';
    viewportText.innerText = text;
}

function updateOperation() {
    let num1Copy = num1
    let num2Copy = num2
    if (String(num1Copy).length > 8) num1Copy = roundNumber(Number(num1Copy))
    if (String(num2Copy).length > 8) num2Copy = roundNumber(Number(num2Copy))

    if (numberChecker(num1) && !operator && !numberChecker(num2)) {
        operationText.textContent = num1Copy
    } else if (numberChecker(num1) && operator && !numberChecker(num2)) {
        operationText.textContent = `${num1Copy}${operator}`
    } else if (numberChecker(num1) && operator && numberChecker(num2)) {
        operationText.textContent = `${num1Copy}${operator}${num2Copy}`;
    }
} 

function numberChecker(number) {
    if (number=='try again.') return false
    else if (number || number === 0) return true
    else return false
}

function allClear() {
    num1 = null;
    num2 = null;
    operator = null;
    result = null;
    // cleared = false;
    viewportText.textContent = 0;
    operationText.textContent = '';
    console.log(`${num1} ${operator} ${num2} = ${result}`);
}

function operate() {
    switch(operator) {
        case "+":
            result = add(num1, num2);
            break;
        case `-`:
            result = subtract(num1, num2);
            break;
        case "×":
            result = multiply(num1, num2);
            break;
        case "÷":
            if (num2===0 || num2==='0') {
                // if dividing by 0, reset calculator
                allClear();
                updateDisplay(`:( \u00A0`);
                return;
            } else {
                result = divide(num1, num2);
            }
            break;
    }
    console.log(`${num1} ${operator} ${num2} = ${result}`);

    // if (String(result).length > 8) result = roundNumber(Number(result))
    updateDisplay(result);
}

const clearButton = document.querySelector('button#clear')
clearButton.addEventListener('click', allClear)

const equalButton = document.querySelector('button#equals')
equalButton.addEventListener('click', operate)

numberButtons.forEach((number) => {
    number.addEventListener("click", () => {
        // if no operator exists -> assign num1 or append to num1
        // if num1 and oeprator exist -> assign num2
        if (!operator) {
            if (!numberChecker(num1)) {
                if (number.value === '0') return;
                else num1 = number.value; 
            } else {
                num1 = num1 + number.value; 
            }
            updateDisplay(num1);
        } else if (numberChecker(num1) && operator) {
            if (!numberChecker(num2)) {
                num2 = number.value; 
            } else {
                num2 = num2 + number.value; 
            }
            updateDisplay(num2);
        } 
        updateOperation();
        console.log(`${num1} ${operator} ${num2} = ${result}`);
    })
})

opButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        if (numberChecker(num1) && !numberChecker(num2) && !numberChecker(result)) {
            // assign if num1 exists and no result is stored
            operator = operation.getAttribute('value');
            operationText.textContent = `${num1}${operator}`;
        } 
        else if (numberChecker(num1) && operator && numberChecker(num2)) {
            // if operator is selected and all values exist, run and reset operation
            operate()
            num1 = result;
            result = null;
            num2 = null;
            operator = operation.getAttribute('value');
        }
        else if (numberChecker(result)) {
            // reassign num1 as result if result exists and reset operation
            num1 = result;
            result = null;
            num2 = null;
            operator = operation.getAttribute('value');
        }
        updateOperation();
        console.log(`${num1} ${operator} ${num2} = ${result}`);
    })
});

const percentButton = document.querySelector('button#percent')
percentButton.addEventListener('click', () => {
    if (numberChecker(num1) && numberChecker(num2)) {
        num2 = divide(num2, 100)
        updateDisplay(num2);
    } else if (numberChecker(num1) && !numberChecker(num2)) {
        num1 = divide(num1, 100)
        updateDisplay(num1);
    }
    updateOperation();
})

const negativeButton = document.querySelector('button#negative')
negativeButton.addEventListener('click', () => {
    if (numberChecker(num1) && numberChecker(num2)) {
        num2 = Number(num2) * -1
        updateDisplay(num2);
    } else if (numberChecker(num1) && !numberChecker(num2)) {
        num1 = Number(num1) * -1
        updateDisplay(num1);
    }
    updateOperation();
})

const decimalButton = document.querySelector('button#decimal')
decimalButton.addEventListener('click', () => {
        //  only allow if number does not already have a decimal
    if (!numberChecker(num1)) {
        num1 = '0.';
    } else if (numberChecker(num1) && !numberChecker(num2)) {
        if (String(num1).includes(".")) return;
        else {
            num1 = String(num1) + '.';
            updateDisplay(num1);
        }
        console.log(`adding decimal to num1: ${num1}`)
    } else if (numberChecker(num1) && numberChecker(num2)) {
        if (String(num2).includes(".")) return;
        else {
            num2 = String(num2) + '.';
            updateDisplay(num2);
        }
    }
    updateOperation();
})

function add(num1, num2) {
    return Number((Number(num1) + Number(num2)).toFixed(5))
}

function subtract(num1, num2) {
    return Number((Number(num1) - Number(num2)).toFixed(5))
}

function multiply(num1, num2) {
    return Number((Number(num1) * Number(num2)).toFixed(5))
}

function divide(num1, num2) {
    return Number((Number(num1) / Number(num2)).toFixed(5))
}

