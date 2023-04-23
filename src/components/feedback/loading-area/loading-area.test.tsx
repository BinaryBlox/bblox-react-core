import React from "react";
import { expectProgressIndicator } from "~/tests/assertions";
import { render } from "~/tests/testing-library";
import { LoadingArea } from "./loading-area";

describe("LoadingArea", () => {
  it("would render a loading icon", () => {
    render(<LoadingArea />);

    expectProgressIndicator();
  });
});
