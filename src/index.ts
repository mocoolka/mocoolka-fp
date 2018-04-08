import * as string from './string';
import * as object from './object';
import * as predicate from './predicate';
import * as d_array from './Array';
import {
    alt, alternative, applicative, apply, array as s_array, bifunctor, category, chain, chainRec, comonad, console,
    const as const_, contravariant, either, eitherT, exception, extend, field,
    foldable, free, function as function_, functor, hkt, identity, invariant, io, ixIo,
    ixMonad, monad, monoid, monoidal, nonEmptyArray, option, optionT, ord, ordering, pair, plus,
    profunctor, random, reader, readerT, ring, semigroup, semigroupoid, semiring, set,
    setoid, state, stateT, store, strmap, task, taskEither, these, trace, traversable, tuple,
    unfoldable, validation, writer,
    monocle, types, typesF, newtype,
} from './fp';
const array = { ...s_array, ...d_array };
export {
    alt, alternative, applicative, apply, array, bifunctor, category, chain, chainRec, comonad, console,
    const_ as const, contravariant, either, eitherT, exception, extend, field,
    foldable, free, function_ as function, functor, hkt, identity, invariant, io, ixIo,
    ixMonad, monad, monoid, monoidal, nonEmptyArray, option, optionT, ord, ordering, pair, plus,
    profunctor, random, reader, readerT, ring, semigroup, semigroupoid, semiring, set,
    setoid, state, stateT, store, strmap, task, taskEither, these, trace, traversable, tuple,
    unfoldable, validation, writer,
    monocle, types, typesF, newtype,
    string, object, predicate
};
