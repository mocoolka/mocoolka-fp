import { IO} from '../IO';
import { filter, array } from '../Array';
import { curry, flip, compose , constant} from '../function';
const filterC = flip(curry(filter));
const mapC = flip(curry(array.map));
const filter1 = filterC(a => a > 1);
const m1 = mapC(b => b + 1);
const c = compose( m1, filter1);
const v = [1, 2, 3];
console.log(c(v));

const append = (a: []) =>
    new IO(() => {
        return filter(a, a => a > 1);
    });
console.log(append(v).run());
constant(console.log(array.map(v, b => b + 1)));
