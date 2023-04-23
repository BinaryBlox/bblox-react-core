import { newBreakpointsCounter } from "./breakpoints";

describe("newBreakpointsCounter", () => {
  //TODO Write some tests to be able to debug/develop faster
  it("should create a new instance with the correct initial values", () => {
    const breakpointsCounter = newBreakpointsCounter();

    expect(breakpointsCounter.xs).toBe(0);
    expect(breakpointsCounter.sm).toBe(0);
    expect(breakpointsCounter.md).toBe(0);
    expect(breakpointsCounter.lg).toBe(0);
    expect(breakpointsCounter.xl).toBe(0);
  });

  describe.each([["xs"], ["sm"], ["md"], ["lg"], ["xl"]])("breakpoint %s", (breakpoint: string) => {
    it.each([
      [false, [2, 3, 3, 4, 3]],
      [false, [2, 3, 3, 4, 12, 3]],
      [false, [6, 6, 6, 6, 6, 12, 3]],
      [false, [4, 4, 4, 4, 4, 3, 8]],
      [false, [4, 4, 4, 4, 4, 3, 8]],
      [true, [1, 2]],
      [true, [12, 6, 3]],
      [true, [2, 6, 3]],
    ])(
      "should have border=%s if apply %s increments",
      (expectedBorder: boolean, increments: number[]) => {
        const breakpointsCounter = newBreakpointsCounter();

        let border: Record<string, boolean> = {};
        increments.forEach((increment) => {
          border = breakpointsCounter.increment({ [breakpoint]: increment }) as Record<
            string,
            boolean
          >;
        });

        expect(border[breakpoint]).toBe(expectedBorder);
      },
    );
  });
});
