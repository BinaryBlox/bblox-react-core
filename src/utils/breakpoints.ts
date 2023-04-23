import { ResponsiveStyleValue } from "@mui/system";

interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface BreakpointsCounter extends Breakpoints {
  increment(breakpoints: Partial<Breakpoints>): ResponsiveStyleValue<boolean>;
}

export const newBreakpointsCounter = (breakpoint = 12): BreakpointsCounter => {
  const calculateBreakpointIncrement = (
    breakpointsCounter: BreakpointsCounter,
    key: keyof Breakpoints,
    value: number,
  ): boolean => {
    const initialValue = breakpointsCounter[key];
    breakpointsCounter[key] += value;
    if (breakpointsCounter[key] > breakpoint) {
      breakpointsCounter[key] = value;
      return false;
    }

    if (breakpointsCounter[key] == breakpoint) {
      breakpointsCounter[key] = 0;
    }

    return initialValue > 0;
  };

  return {
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
    increment: function ({
      xs = 0,
      sm = 0,
      md = 0,
      lg = 0,
      xl = 0,
    }): ResponsiveStyleValue<boolean> {
      const smInc = sm || xs;
      const mdInc = md || smInc;
      const lgInc = lg || mdInc;
      const xlInc = xl || lgInc;

      return {
        xs: calculateBreakpointIncrement(this, "xs", xs),
        sm: calculateBreakpointIncrement(this, "sm", smInc),
        md: calculateBreakpointIncrement(this, "md", mdInc),
        lg: calculateBreakpointIncrement(this, "lg", lgInc),
        xl: calculateBreakpointIncrement(this, "xl", xlInc),
      };
    },
  };
};
