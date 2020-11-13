import { ValidatorInterface } from '../interfaces/validator.interface';

/**
 * The class responsible for calculating results for expressions
 */
export default class CalculatorService {
  constructor(private operators: Map<string, string>, private validator: ValidatorInterface) {}

  /**
   * Try to calculate a verbose math expression
   * @param  {string} expression
   * @returns number
   */
  calculate(expression: string): number {
    this.validate(expression);
    const convertedExpression: string = this.convert(expression);

    return eval(convertedExpression);
  }

  /**
   * Validates the expression
   * @param  {string} expression
   * @throws Error case invalid
   */
  private validate(expression: string): void {
    if (!this.validator.isValid(expression)) {
      throw new Error('Invalid arguments');
    }
  }

  /**
   * Convert verbose operators into real math operators
   * @param  {string} expression
   * @returns string
   */
  private convert(expression: string): string {
    let convertedExpression: string = expression;

    this.operators.forEach((value: string, key: string) => {
      convertedExpression = convertedExpression.replace(key, value);
    });

    return convertedExpression;
  }
}
