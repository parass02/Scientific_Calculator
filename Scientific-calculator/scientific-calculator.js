let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

const display = document.getElementById('display');

const updateDisplay = () => {
    display.textContent = currentInput;
}

const appendToDisplay = (value) => {
    if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    currentInput += value;
    updateDisplay();
}

const clearDisplay = () => {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

const backspace = () => {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

const setOperation = (op) => {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

const calculate = () => {
    let result;
    try {
        if (currentInput.includes('%')) {
            const percentValue = parseFloat(currentInput) / 100;
            currentInput = percentValue.toString();
        }
        result = Function('"use strict";return (' + currentInput + ')')();
        if (Number.isInteger(result)) {
            currentInput = result.toString();
        } else {
            currentInput = result.toFixed(4).toString();
        }
    } catch (error) {
        currentInput = 'Error';
    }
    operation = null;
    updateDisplay();
}

updateDisplay();

document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        setOperation(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        backspace();
    }
});