/**
 * This class contains a centralized list of valid operation names
 */
export default class OperatorsDictionary {
  public static operatorsList: Map<string, string> = new Map<string, string>([
    ['plus', '+'],
    ['minus', '-'],
    ['into', '*'],
    ['times', '*'],
    ['divided', '/'],
  ]);
}
