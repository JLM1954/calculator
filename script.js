let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') return;

    // Handle negative numbers
    if (op === '-' && currentInput === '' && previousInput === '') {
        currentInput = '-';
        updateDisplay();
        return;
    }

    if (operation !== null && currentInput !== '') {
        calculate();
    }

    previousInput = currentInput;
    operation = op;
    currentInput = '';
    shouldResetDisplay = true;
}

function calculate() {
    if (operation === null || currentInput === '' || previousInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
        case '.':
            return;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.' || key === ',') {
        event.preventDefault();
        appendOperator('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});