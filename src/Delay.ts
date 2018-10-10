import {Task} from './Task';
import {IO} from './IO';
import {Lazy} from './function';
export const delay = <A>(n: number, a: IO<A>): Task<A> =>
  new Task<A>(
    () =>
      new Promise<A>(resolve => {
        setTimeout(() => resolve(a.run()), n);
      })
  );
export const delayTimer = <A>(n: number, a: IO<A>): NodeJS.Timer =>
    setTimeout(() => a.run(), n);

export const delayFunction = <A>(n: number, a: Lazy<A>): Task<A> => delay(n, new IO(a));
export const delayTimerFunction = <A>(n: number, a: Lazy<A>): NodeJS.Timer => delayTimer(n, (new IO(a)));
