import TokenService from './token.service';
import ParserService from './parser.service';
import TokenDefinition from '../interfaces/token.definition';
import ValidatorInterface from '../interfaces/validator.interface';

/**
 * Responsible for calculating the result for expressions
 */
export default class CalculatorService {
  constructor(private validator: ValidatorInterface) {}

  /**
   * Try to calculate a verbose math expression, following the steps:
   * 1) validate against typos
   * 2) create tokens
   * 3) parse the created tokens
   * @param  {string} expression
   * @returns number
   */
  calculate(expression: string): number {
    this.validate(expression);

    const tokenService: TokenService = new TokenService();
    const tokens: TokenDefinition[] = tokenService.tokenize(expression);

    const parserService: ParserService = new ParserService(tokens);
    return parserService.parseOperations();
  }

  /**
   * Validates the expression to avoid typos
   * @param  {string} expression
   * @throws Error case invalid
   */
  private validate(expression: string): void {
    if (!this.validator.isValid(expression)) {
      throw new Error('The expression has a typo');
    }
  }
}
