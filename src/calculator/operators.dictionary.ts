/**
 * Contains a centralized list of valid operation names
 */
export default class OperatorsDictionary {
  ALL: string[] = ['plus', 'minus', 'times', 'divided'];

  TYPE_NUM = 'NUM';
  TYPE_LEFT_PAREN = 'L_PAREN';
  TYPE_RIGHT_PAREN = 'R_PAREN';
  TYPE_OPERATOR = 'OPERATOR';

  END_OF_EXPRESSION = 'END_OF_EXPRESSION';

  SALIENCES = {
    plus: 1,
    minus: 1,
    times: 2,
    divided: 2,
  };
}
