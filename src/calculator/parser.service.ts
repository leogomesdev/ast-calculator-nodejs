import OperatorsDictionary from './operators.dictionary';
import TokenDefinition from '../interfaces/token.definition';
import ResolverDefinition from '../interfaces/resolver.definition';

/**
 * Parse tokens into a result
 */
export default class ParserService {
  private index = 0;
  private operatorsDictionary: OperatorsDictionary;

  OPERATION_PLUS = 'plus';
  OPERATION_MINUS = 'minus';
  OPERATION_TIMES = 'times';
  OPERATION_DIVIDED = 'divided';

  constructor(private tokens: TokenDefinition[]) {
    this.operatorsDictionary = new OperatorsDictionary();
  }

  private resolvers: { [x: string]: ResolverDefinition } = {
    [this.OPERATION_PLUS]: { saliency: 1, eval: (v1: number, v2: number): number => v1 + v2 },
    [this.OPERATION_MINUS]: { saliency: 1, eval: (v1: number, v2: number): number => v1 - v2 },
    [this.OPERATION_TIMES]: { saliency: 2, eval: (v1: number, v2: number): number => v1 * v2 },
    [this.OPERATION_DIVIDED]: { saliency: 2, eval: (v1: number, v2: number): number => v1 / v2 },
  };

  private moveToNext(): void {
    this.index++;
  }

  private current(): TokenDefinition {
    return this.tokens[this.index] || { type: this.operatorsDictionary.END_OF_EXPRESSION };
  }

  parseOperations(saliency = 0): number {
    let result: number = this.parseExpression();
    while (this.current().type === this.operatorsDictionary.TYPE_OPERATOR && this.current().saliency >= saliency) {
      const operator = this.current();
      this.moveToNext();
      const operand2 = this.parseOperations(operator.saliency);
      result = this.resolvers[operator.value].eval(result, operand2);
    }
    return result;
  }

  private parseExpression(): number {
    if (this.current().type === this.operatorsDictionary.TYPE_NUM) {
      const value: number = Number(this.current().value);
      this.moveToNext();
      return value;
    }

    if (this.current().type === this.operatorsDictionary.TYPE_LEFT_PAREN) {
      this.moveToNext();
      const result: number = this.parseOperations();
      if (this.current().type !== this.operatorsDictionary.TYPE_RIGHT_PAREN) {
        throw new Error('Expect to close parentheses');
      }
      this.moveToNext();
      return result;
    }
    throw new Error('Expect to find an operand');
  }

  // private parseAddAndMinus(): number {
  //   let result: number = this.parseTimesAndDivision();
  //   while (this.current().value == this.OPERATION_PLUS || this.current().value == this.OPERATION_MINUS) {
  //     const operator = this.current();
  //     this.moveToNext();
  //     result = this.resolvers[operator.value].eval(result, this.parseTimesAndDivision());
  //   }
  //   return result;
  // }
  
  // private parseTimesAndDivision(): number {
  //   let result = this.parseExpression();
  //   while (this.current().value == this.OPERATION_TIMES || this.current().value == this.OPERATION_DIVIDED) {
  //     const operator = this.current();
  //     this.moveToNext();
  //     result = this.resolvers[operator.value].eval(result, this.parseExpression());
  //   }
  //   return result;
  // }
}
