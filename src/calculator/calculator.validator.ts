import { ValidatorInterface } from '../interfaces/validator.interface';

export default class CalculatorValidator implements ValidatorInterface {
  private regexExpression: RegExp;

  /**
   * @param  {string[]} validMathOperators list of valid operator names
   */
  constructor(validMathOperators: string[]) {
    const operators: string = validMathOperators.join('|');
    this.regexExpression = new RegExp(`^(${operators}|[0-9 ()])*$`);
  }

  /**
   * Checks if the given expression is valid
   * @param  {string} expression
   * @returns boolean
   */
  isValid(expression: string): boolean {
    return this.regexExpression.test(expression);
  }
}
