import * as readline from 'readline';
import CalculatorService from './calculator/calculator.service';
import CalculatorValidator from './calculator/calculator.validator';
import OperatorsDictionary from './calculator/operators.dictionary';

const calculatorValidator: CalculatorValidator = new CalculatorValidator(
  [...(OperatorsDictionary.operatorsList.keys())],
);

const calculatorService: CalculatorService = new CalculatorService(
  OperatorsDictionary.operatorsList,
  calculatorValidator,
);

const readlineTool = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Function that allows console interation with the user
 */
function startFromConsole() {
  readlineTool.question('Type your expression and press [ENTER]:\n', (expression) => {
    try {
      const response: number = calculatorService.calculate(expression);
      console.log(`The answer is: ${response}\n`);
    } catch (error) {
      console.error(`${error}\n`);
    }
    readlineTool.close();
  });
}

startFromConsole();
