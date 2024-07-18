document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonValue = this.innerText;

            if (buttonValue === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.innerText = '0';
                return;
            }

            if (buttonValue === '←') {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
                return;
            }

            if ('0123456789.'.includes(buttonValue)) {
                currentInput += buttonValue;
                display.innerText = currentInput;
                return;
            }

            if ('/*-+'.includes(buttonValue)) {
                if (currentInput === '') return;

                if (previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                }

                previousInput = currentInput;
                currentInput = '';
                operator = buttonValue;
                return;
            }

            if (buttonValue === '=') {
                if (currentInput === '' || previousInput === '') return;

                currentInput = calculate(previousInput, currentInput, operator);
                display.innerText = currentInput;
                previousInput = '';
                operator = '';
            }
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        if (isNaN(a) || isNaN(b)) return '';

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '';
        }
    }
});
