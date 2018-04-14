import ISequence from './Sequence';

export class OnEach {

    /**
     * Performs the given `action` for each element and returns the sequence.
     *
     * @param {(value: T) => void} action
     * @returns {ISequence<T>}
     */
    onEach<T>(this: ISequence<T>, action: (value: T) => void): ISequence<T> {
        return this.map(it => {
            action(it);
            return it;
        });
    }

}
