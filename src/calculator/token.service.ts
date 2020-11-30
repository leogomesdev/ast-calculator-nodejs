import OperatorsDictionary from './operators.dictionary';
import TokenDefinition from '../interfaces/token.definition';

/**
 * Converts an expression in a list of tokens
 */
export default class TokenService {
  private tokens: TokenDefinition[] = [];
  private operatorsDictionary: OperatorsDictionary;

  constructor() {
    this.operatorsDictionary = new OperatorsDictionary();
  }

  /**
   * Given a string, convert into a list of tokens
   * @param fullExpression string
   * @returns TokenDefinition[]
   */
  tokenize(fullExpression: string): TokenDefinition[] {
    fullExpression = fullExpression.trim();
    let currentString: string = '';

    for (let index = 0; index < fullExpression.length; index++) {
      currentString += fullExpression[index];
      currentString = currentString.trim();
      const nextValue: string = fullExpression[index + 1];

      if (this.addStringAsToken(currentString, nextValue)) {
        currentString = '';
      }
    }
    return this.tokens;
  }

  /**
   * If the string is valid for a token (a number or operator or parentheses), adds this token into the array
   * @param currentString string
   * @param nextValue string
   * @returns boolean true if the token was added, otherwise returns false
   */
  private addStringAsToken(currentString: string, nextValue: string): boolean {
    if (this.isNumber(currentString) && !this.isNumber(nextValue)) {
      this.tokens.push({ type: this.operatorsDictionary.TYPE_NUM, value: Number(currentString) });
      return true;
    }

    if (currentString === '(') {
      this.tokens.push({ type: this.operatorsDictionary.TYPE_LEFT_PAREN });
      return true;
    }

    if (currentString === ')') {
      this.tokens.push({ type: this.operatorsDictionary.TYPE_RIGHT_PAREN });
      return true;
    }

    if (this.isOperator(currentString) && !this.isOperator(nextValue)) {
      this.tokens.push({ type: this.operatorsDictionary.TYPE_OPERATOR, value: currentString, saliency: 1 });
      return true;
    }

    return false;
  }

  /**
   * Checks if the value is numeric
   * @param value string to verify
   * @returns boolean
   */
  private isNumber(value: string): boolean {
    return !isNaN(Number(value)) && value !== '';
  }

  /**
   * Checks if the value is a math operator (minus, times, etc.)
   * @param value string to verify
   * @returns boolean
   */
  private isOperator(value: string): boolean {
    return this.operatorsDictionary.ALL.includes(value);
  }
}
