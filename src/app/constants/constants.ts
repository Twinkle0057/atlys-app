import { parse } from "mathjs";
import { Block } from "../components/FunctionalBlock";

export const caluclate = (arr: Block[], x: number) => {
  const evaluvate = (e: string, inp: number) => {
    try {
      const expr = parse(e);

      // console.log(e, expr);
      const result = expr.evaluate({x: inp});
      // console.log(result);
  
      if (typeof result !== 'number' || isNaN(result)) {
        throw new Error('Invalid equation or input.');
      }
  
      return result;
    } catch (error) {
      console.error('Error evaluating equation:', error);
      return 0;
    }
  }

  let res = evaluvate(arr[0].equation, x);
  res = evaluvate(arr[1].equation, res);
  res = evaluvate(arr[3].equation, res);
  res = evaluvate(arr[4].equation, res);
  res = evaluvate(arr[2].equation, res);

  return res;
}