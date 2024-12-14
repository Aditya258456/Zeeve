const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent;
      if (buttonText === '←') {
        currentInput = currentInput.slice(0, -1);
      } else if (buttonText === 'C') {
        currentInput = '';
      } else if (buttonText === '=') {
        currentInput = eval(currentInput);
      } else {
        currentInput += buttonText;
      }
      display.value = currentInput;
    });
  });