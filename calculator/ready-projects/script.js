const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const minus = document.getElementById('minus');
const result = document.getElementById('result');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {

  let sing = 1;

  if (op === '-x') {
    sing *= -1;
  }

  let numOfpoint = 0;
  let numStr = '1';

  let localOperationMemory = display.value;
  let num = +localOperationMemory * sing;

  let numS = num.toString();

  for (let i = 0; i < numS.length; i++) {

    if (numS[i] == '.') {

      numOfpoint = i;

    }
    if (i > numOfpoint) {

      numStr += '0';
    }

  }

  numStr = Number(numStr);

  if (op === '√' || op === '%') {
    MemoryPendingOperation = op;

    if (MemoryPendingOperation === '%') {

      MemoryCurrentNumber = num / 100 * sing;
    } else if (MemoryPendingOperation === '√') {
      if (num < 0) {

        MemoryCurrentNumber = 'error, push C 😋'
      } else {
        MemoryCurrentNumber = Math.sqrt(num);
      }
    }

  } else {

    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += num;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= num;
    } else if (MemoryPendingOperation === '*') {
      numStr *= numStr;
      MemoryCurrentNumber *= num;
    } else if (MemoryPendingOperation === '^') {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, num);
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= num;
    } else {
      MemoryCurrentNumber = num;
    }

    MemoryPendingOperation = op;
  }

  if (num > 0 && num < 1) {
    display.value = Math.round(MemoryCurrentNumber * numStr) / numStr;
  } else {
    display.value = MemoryCurrentNumber;
  }


}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}