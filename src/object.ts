import { Many, PropertyName } from './TypeLevel';
import {
    get 
} from 'lodash';


export type GetProperty = (propName: Many<PropertyName>) => (a: object) => any;
export type ManyPropertyName = Many<PropertyName>;
export const _get = <T>(propName: ManyPropertyName) => 
(a:  object):  T => get(a, propName);

