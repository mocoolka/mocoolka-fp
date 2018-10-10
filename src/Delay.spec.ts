import {delay,delayFunction,delayTimerFunction} from './Delay';
import {IO} from './IO';
import {constant} from './function'
describe('delay',()=>{
    it('delay',async ()=>{
        const action=new IO(constant(1))
        const  result= await delay(200,action).run();
        expect(result).toEqual(1)
    })
    it('delayFunction',async ()=>{
        const  result= await delayFunction(200,constant(1)).run();
        expect(result).toEqual(1)
    })
    it('delayTimerFunction',async ()=>{
        const mockCallback = jest.fn(a=> 42 + a);
        delayTimerFunction(200,mockCallback);
        await  delayFunction(300,()=>void 0).run();
        expect(mockCallback).toBeCalledTimes(1);
    })
    it('delayTimerFunction',async ()=>{
        const mockCallback = jest.fn(x => 42 + x);
        const  timer= await delayTimerFunction(200,mockCallback);
        await delayFunction(100,()=>clearTimeout(timer)).run();
        await  delayFunction(300,()=>void 0).run();
        expect(mockCallback).toBeCalledTimes(0);
    })
})