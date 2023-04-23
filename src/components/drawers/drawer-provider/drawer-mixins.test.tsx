import { createTheme } from "@mui/material";
import { openedMixin, closedMixin } from "./drawer-mixins";

describe("mixins", () => {
  it("would match a snapshot", () => {
    const theme = createTheme();
    expect(openedMixin(theme)).toStrictEqual({
      overflowX: "hidden",
      transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      width: 240,
    });
  });

  it("would match a snapshot", () => {
    const theme = createTheme();
    expect(closedMixin(theme)).toStrictEqual({
      "@media (min-width:600px)": {
        width: "calc(64px + 1px)",
      },
      overflowX: "hidden",
      transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      width: "calc(56px + 1px)",
    });
  });
});
