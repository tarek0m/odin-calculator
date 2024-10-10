// CALCULATOR CLASS
class Calculator {
  #a;
  #b;
  #opr;
  #doneFlag;

  constructor() {
    this.#doneFlag = true;
  }

  /**
   * @param {Number} val
   */
  set a(val) {
    this.#a = val;
  }
  get a() {
    return this.#a;
  }

  /**
   * @param {Number} val
   */
  set b(val) {
    this.#b = val;
  }
  get b() {
    return this.#b;
  }

  /**
   * @param {String} val
   */
  set opr(val) {
    this.#opr = val;
  }
  get opr() {
    return this.#opr;
  }

  /**
   * @param {Boolean} val
   */
  set doneFlag(val) {
    this.#doneFlag = val;
  }
  get doneFlag() {
    return this.#doneFlag;
  }

  add() {
    return parseFloat((this.#a + this.#b).toFixed(4));
  }

  sub() {
    return parseFloat((this.#a - this.#b).toFixed(4));
  }

  mul() {
    return parseFloat((this.#a * this.#b).toFixed(4));
  }

  divide() {
    if (this.#b === 0) {
      return 'Division by zero is not allowed';
    }
    return parseFloat((this.#a / this.#b).toFixed(4));
  }

  operate() {
    this.doneFlag = true;
    switch (this.#opr) {
      case '+':
        return this.add();
      case '-':
        return this.sub();
      case '*':
        return this.mul();
      case '/':
        return this.divide();
      default:
        throw new Error('Invalid operation');
    }
  }
}

const c = new Calculator();

// DOM MANIPULATION
const calc = document.querySelector('#calc');
const display = document.querySelector('#display');
const result = document.querySelector('#result');
const history = document.querySelector('#history');
const clearAll = document.querySelector('#c');

/**
 * Adds a number to the calculator's operand
 * @param {String} text - The number as a string
 * @param {String} operand - The operand to set ('a' or 'b')
 */
function addToC(text, operand) {
  const number = parseFloat(text);
  c[operand] = number;
}

/**
 * Clears the calculator's operands and operation
 */
function clearC() {
  c.a = null;
  c.b = null;
  c.opr = null;
}

calc.addEventListener('click', (e) => {
  const isButton = e.target.nodeName === 'BUTTON';
  const isNumber = /[0-9.]/.test(e.target.innerText);
  const isOperate = e.target.id === 'operate';
  const isOperation = /^[//*+-]$/.test(e.target.innerText);
  const isClear = e.target.id === 'c';
  const isNegate = e.target.id === 've';
  const isCE = e.target.id === 'ce';
  const isBackspace = e.target.id === 'bck';

  if (!isButton) return;

  if (isNegate) {
    result.innerText = result.innerText.startsWith('-')
      ? result.innerText.slice(1)
      : '-' + result.innerText;
  }

  if (isBackspace) {
    result.innerText = result.innerText.slice(0, -1);
  }

  if (isNumber) {
    if (c.doneFlag) {
      result.innerText = '';
      history.innerText = '';
      c.doneFlag = false;
    }
    if (e.target.innerText === '.' && result.innerText.includes('.')) return;

    result.innerText += e.target.innerText;
  }

  if (isClear) {
    result.innerText = '';
    history.innerText = '';
    clearC();
  }

  if (isCE) {
    result.innerText = '';
  }

  if (isOperation) {
    if (c.opr) return;
    addToC(result.innerText, 'a');
    c.opr = e.target.innerText;
    if (c.doneFlag) {
      history.innerText = '';
      c.doneFlag = false;
    }
    history.innerText += result.innerText + e.target.innerText;
    result.innerText = '';
  }

  if (isOperate) {
    if (
      c.doneFlag ||
      !c.opr ||
      !/\d/.test(result.innerText) ||
      result.innerText === ''
    )
      return;
    addToC(result.innerText, 'b');
    history.innerText += result.innerText;
    result.innerText = c.operate();
    clearC();
  }
});
