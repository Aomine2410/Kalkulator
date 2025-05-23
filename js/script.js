document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let currentOperation = null;
    let previousInput = '';
    let calculationPerformed = false;
    
    // Fungsi untuk memperbarui tampilan
    function updateDisplay() {
        display.value = currentInput || '0';
    }
    
    // Fungsi untuk menambahkan digit
    function appendDigit(digit) {
        if (calculationPerformed) {
            currentInput = '';
            calculationPerformed = false;
        }
        
        // Jika input masih 0, ganti dengan angka baru kecuali untuk desimal
        if (currentInput === '0' && digit !== '.') {
            currentInput = digit;
        } else {
            // Hindari multiple decimal points
            if (digit === '.' && currentInput.includes('.')) {
                return;
            }
            currentInput += digit;
        }
        updateDisplay();
    }
    
    // Fungsi untuk operasi
    function handleOperator(operator) {
        if (currentInput === '') return;
        
        if (previousInput !== '') {
            calculate();
        }
        
        previousInput = currentInput;
        currentOperation = operator;
        currentInput = '';
    }
    
    // Fungsi untuk kalkulasi
    function calculate() {
        if (currentOperation === null || previousInput === '' || currentInput === '') {
            return;
        }
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch(currentOperation) {
            case '+':
                result = prev + current;
                break;
            case '−':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Error: Tidak bisa membagi dengan nol!');
                    clearAll();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        // Mengatasi pembulatan JavaScript yang aneh
        currentInput = parseFloat(result.toFixed(10)).toString();
        currentOperation = null;
        previousInput = '';
        calculationPerformed = true;
        updateDisplay();
    }
    
    // Fungsi untuk menghapus semua
    function clearAll() {
        currentInput = '0';
        currentOperation = null;
        previousInput = '';
        calculationPerformed = false;
        updateDisplay();
    }
    
    // Fungsi untuk menghapus satu karakter
    function backspace() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
            updateDisplay();
        }
    }
    
    // Fungsi untuk menghitung persen
    function calculatePercent() {
        if (currentInput !== '') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
            calculationPerformed = true;
        }
    }
    
    // Event listeners untuk angka
    document.getElementById('zero').addEventListener('click', () => appendDigit('0'));
    document.getElementById('one').addEventListener('click', () => appendDigit('1'));
    document.getElementById('two').addEventListener('click', () => appendDigit('2'));
    document.getElementById('three').addEventListener('click', () => appendDigit('3'));
    document.getElementById('four').addEventListener('click', () => appendDigit('4'));
    document.getElementById('five').addEventListener('click', () => appendDigit('5'));
    document.getElementById('six').addEventListener('click', () => appendDigit('6'));
    document.getElementById('seven').addEventListener('click', () => appendDigit('7'));
    document.getElementById('eight').addEventListener('click', () => appendDigit('8'));
    document.getElementById('nine').addEventListener('click', () => appendDigit('9'));
    document.getElementById('decimal').addEventListener('click', () => appendDigit('.'));
    
    // Event listeners untuk operator
    document.getElementById('add').addEventListener('click', () => handleOperator('+'));
    document.getElementById('subtract').addEventListener('click', () => handleOperator('−'));
    document.getElementById('multiply').addEventListener('click', () => handleOperator('×'));
    document.getElementById('divide').addEventListener('click', () => handleOperator('÷'));
    document.getElementById('percent').addEventListener('click', () => calculatePercent());
    
    // Event listeners untuk fungsi lain
    document.getElementById('equals').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clearAll);
    document.getElementById('backspace').addEventListener('click', backspace);
    
    // Keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key >= '0' && event.key <= '9') {
            appendDigit(event.key);
        } else if (event.key === '.') {
            appendDigit('.');
        } else if (event.key === '+') {
            handleOperator('+');
        } else if (event.key === '-') {
            handleOperator('−');
        } else if (event.key === '*') {
            handleOperator('×');
        } else if (event.key === '/') {
            event.preventDefault(); // Prevent browser quick find
            handleOperator('÷');
        } else if (event.key === '%') {
            calculatePercent();
        } else if (event.key === 'Enter' || event.key === '=') {
            calculate();
        } else if (event.key === 'Escape') {
            clearAll();
        } else if (event.key === 'Backspace') {
            backspace();
        }
    });
    
    // Inisialisasi display
    clearAll();
});
