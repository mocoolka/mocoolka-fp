import {sequenceOf} from "../";

describe("reduceIndexed", () => {
    it("should sum all numbers + indices", () => {
        const result = sequenceOf(1, 2, 3)
            .reduceIndexed((index: number, acc: number, value: number) => acc + value + index);
        expect(result).toBe(9);
    });
});