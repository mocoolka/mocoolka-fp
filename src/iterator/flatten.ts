import ISequence, {asSequence, isSequence} from './Sequence';

export class Flatten {

    /**
     * Returns a single flat sequence of all the items from all sequences or iterables.
     *
     * @returns {ISequence<T>}
     */
    flatten<T>(this: ISequence<ISequence<T> | Iterable<T>>): ISequence<T> {
        return this.flatMap(it => {
            if (isSequence(it)) {
                return it;
            } else {
                return asSequence(it);
            }
        });
    }

}
