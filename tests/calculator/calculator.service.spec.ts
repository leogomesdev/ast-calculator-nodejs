import CalculatorService from '../../src/calculator/calculator.service';
import CalculatorValidator from '../../src/calculator/calculator.validator';
import OperatorsDictionary from '../../src/calculator/operators.dictionary';

describe('CalculatorService', () => {
  const operatorsList: string[] = [...(OperatorsDictionary.operatorsList.keys())];
  let calculatorValidator: CalculatorValidator;
  calculatorValidator = new CalculatorValidator(operatorsList);

  let calculatorService: CalculatorService;
  calculatorService = new CalculatorService(OperatorsDictionary.operatorsList, calculatorValidator);

  describe('calculate', () => {
    describe('single operations', () => {
      const cases: { operationName: string, testCase: string, expectedResult: number }[] = [
        { operationName: 'plus', testCase: '1 plus 1', expectedResult: 2 },
        { operationName: 'minus', testCase: '1000 minus 1', expectedResult: 999 },
        { operationName: 'into', testCase: '3 into 4', expectedResult: 12 },
        { operationName: 'times', testCase: '4 times 4', expectedResult: 16 },
        { operationName: 'divided', testCase: '20 divided 5', expectedResult: 4 },
      ];

      cases.forEach((item) => {
        it(`calculates the result correctly, for ${item.operationName} operations`, () => {
          expect(calculatorService.calculate(item.testCase))
            .toEqual(item.expectedResult);
        });
      });
    });

    describe('complex operations', () => {
      const cases: { operationName: string, testCase: string, expectedResult: number }[] = [
        { operationName: 'plus and minus', testCase: '1 plus (17 minus 4)', expectedResult: 14 },
        { operationName: 'minus and times', testCase: '1000 minus (1 times 100)', expectedResult: 900 },
        { operationName: 'into and plus', testCase: '(3 into 4) plus 10', expectedResult: 22 },
        { operationName: 'times and divided', testCase: '(4 times 4) divided 2', expectedResult: 8 },
        { operationName: 'divided and plus', testCase: '(20 divided 5) plus 10', expectedResult: 14 },
      ];

      cases.forEach((item) => {
        it(`calculates the result correctly, for ${item.operationName} operations`, () => {
          expect(calculatorService.calculate(item.testCase))
            .toEqual(item.expectedResult);
        });
      });
    });

    it(`throws error for invalid operations`, () => {
      expect(() => calculatorService.calculate('1 times John'))
        .toThrowError('Invalid arguments');
    });

    it(`throws error for operations with a typo`, () => {
      expect(() => calculatorService.calculate('1 time 1'))
        .toThrow('Invalid arguments');
    });

    it(`throws error incomplete operations`, () => {
      expect(() => calculatorService.calculate('1 times'))
        .toThrow('Unexpected end of input');
    });
  });
});
