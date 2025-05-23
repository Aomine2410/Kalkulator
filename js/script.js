document.addEventListener('DOMContentLoaded', function() {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '';
    let currentOperation = null;
    let previousInput = '';
    let shouldResetScreen = false;
    
    // Menambahkan event listener untuk setiap tombol
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            
            // Logika berdasarkan tipe tombol
            if (this.classList.contains('number')) {
                handleNumber(value);
            } else if (this.classList.contains('operator')) {
                handleOperator(value);
            } else if (this.id === 'equals') {
                calculate();
            } else if (this.id === 'clear') {
                clearCalculator();
            } else if (this.id === 'backspace') {
                backspace();
            } else if (this.id === 'decimal') {
                addDecimal();
            }
            
            updateDisplay();
        });
    });
    
    // Menambahkan dukungan keyboard
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if (/[0-9]/.test(key)) {
            handleNumber(key);
        } else if (key === '.') {
            addDecimal();
        } else if (['+', '-', '*', '/'].includes(key)) {
            const operatorMap = {
                '+': '+',
                '-': '-',
                '*': '×',
                '/': '÷'
            };
            handleOperator(operatorMap[key]);
        } else if (key === 'Enter' || key === '=') {
            calculate();
        } else if (key === 'Escape') {
            clearCalculator();
        } else if (key === 'Backspace') {
            backspace();
        }
        
        updateDisplay();
    });
    
    function handleNumber(value) {
        if (shouldResetScreen) {
            currentInput = '';
            shouldResetScreen = false;
        }
        currentInput += value;
    }
    
    function handleOper
