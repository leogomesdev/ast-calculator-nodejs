import CalculatorValidator from '../../src/calculator/calculator.validator';
import OperatorsDictionary from '../../src/calculator/operators.dictionary';

describe('CalculatorValidator', () => {
  const operatorsList: string[] = [...(OperatorsDictionary.operatorsList.keys())];
  let calculatorValidator: CalculatorValidator;
  calculatorValidator = new CalculatorValidator(operatorsList);

  describe('isValid', () => {
    describe('single operations', () => {
      const cases: Map<string, string> = new Map<string, string>([
        ['plus', '1 plus 1'],
        ['minus', '1000 minus 1'],
        ['into', '3 into 4'],
        ['times', '4 times 4'],
        ['divided', '20 divided 5'],
      ]);

      cases.forEach((value: string, key: string) => {
        it(`returns true for ${key} operations`, () => {
          expect(calculatorValidator.isValid(value))
            .toBeTruthy();
        });
      });
    });

    describe('complex operations', () => {
      const cases: Map<string, string> = new Map<string, string>([
        ['plus and minus', '1 plus (17 minus 4)'],
        ['minus and times', '1000 minus (1 times 100)'],
        ['into and plus', '(3 into 4) plus 10'],
        ['times and divided', '(4 times 4) divided 2'],
        ['divided and plus', '(20 divided 5) plus 10'],
      ]);

      cases.forEach((value: string, key: string) => {
        it(`returns true for ${key} operations`, () => {
          expect(calculatorValidator.isValid(value))
            .toBeTruthy();
        });
      });
    });

    it(`returns false for invalid operations`, () => {
      expect(calculatorValidator.isValid('1 times John'))
        .toBeFalsy();
    });

    it(`returns false for operations with a typo`, () => {
      expect(calculatorValidator.isValid('1 time 1'))
        .toBeFalsy();
    });
  });
});
