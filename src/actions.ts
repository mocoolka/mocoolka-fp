import { Prism } from './Monocle';
import { some, none, Option } from './Option';
import { catOptions, head } from './Array';
export type Action<T> = { type: string, payload: T };
export const isAction = (a: any): a is Action<any> => a && a.type && a.payload;
export type Actions = { [name: string]: Prism<Action<any>, any> };
export const createAction = <T>(type: string) => (
  new Prism<Action<T>, T>(
    s => (s.type === type ? some(s.payload) : none),
    payload => ({
      type: type,
      payload,
    })
  )
);
export const getResult = <S>(r: Array<Option<S>>, value: S) =>
  head(catOptions(r)).getOrElse(value);
export type Dispatch<T, S> = (action: Action<T>) => (store: S) => S;
export const composeDispatch = <T1, S, T2>(a: Dispatch<T1, S>, b: Dispatch<T2, S>): Dispatch<T1 & T2, S> =>
  (action) => (store) => b(action)(a(action)(store));
