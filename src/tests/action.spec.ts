import { createAction, Action, getResult, composeDispatch, Dispatch } from '../actions';
import { deleteByIdWhile,  modifyByIdWhile } from '../Array';
const addUser = createAction<{ name: string, email: string }>('AddUser');
const deleteUser = createAction<string>('DeleteUser');
const modifyUser = createAction<{ name: string, email: string }>('modify');
type User = {
    name: string,
    email: string,
}
type Store = {
    users: User[];
}
const store: Store = {
    users: [{
        name: 'jyt',
        email: 'jyt@gmail.com'
    }]
}
export const dispatch: Dispatch<any, Store> = (action: Action<any>) => (store) => {

    return getResult([
        addUser.getOption(action).map(a => ({ users: [...store.users, a] })),
        deleteUser.getOption(action).map(a => ({ users: deleteByIdWhile(store.users, b => b.name === a).getOrElse(store.users) })),
    ], store)

}
export const dispatch1: Dispatch<any, Store> = (action: Action<any>) => (store) => {

    return modifyUser.getOption(action).map(
        a => ({ users: modifyByIdWhile(store.users, b => b.name === a.name, c => ({ ...c, email: a.email })).getOrElse(store.users) })).getOrElse(store);

}

export const m = composeDispatch(dispatch, dispatch1);
describe('action', () => {
    it('createAction', () => {
        const g = addUser.reverseGet({ name: 'fast', email: 'fast@gamil.com' })
        expect(g.payload).toEqual({ name: 'fast', email: 'fast@gamil.com' });
        expect(g.type).toEqual('AddUser');
    })
    it('match action', () => {
        expect(m(addUser.reverseGet({ name: 'fast', email: 'fast@gamil.com' }))(store)).toEqual(
            {
                users: [{
                    name: 'jyt',
                    email: 'jyt@gmail.com'
                }, {
                    name: 'fast',
                    email: 'fast@gamil.com'
                }]
            }
        );

    })
})
