import { newArrayWithSize } from "./arrays";

describe("newArrayWithSize", () => {
  it("would create a new array with size 3 filled with 5", () => {
    const a = newArrayWithSize(3, 5);
    expect(a).toHaveLength(3);
    expect(a.every((x) => x === 5)).toBeTruthy();
  });
});
