import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { render, screen } from "~/tests/testing-library";
import { useNavigateWhenValueChanges } from "./routing.hooks";
import userEvent from "@testing-library/user-event";

describe("useNavigateWhenValueChanges", () => {
  const renderHook = ({ to, from }: { to: boolean; from: boolean }) => {
    const DummyComponent = () => {
      const [value, setValue] = useState<boolean | undefined>(false);
      useNavigateWhenValueChanges("/destination", value, { from, to });

      return (
        <Box>
          <Button onClick={() => setValue(undefined)}>undefined</Button>
          <Button onClick={() => setValue(false)}>false</Button>
          <Button onClick={() => setValue(true)}>true</Button>
        </Box>
      );
    };

    const DummyRoute = ({ label }: { label: string }) => {
      return <Typography>{label}</Typography>;
    };

    const { history } = render(
      <>
        <Routes>
          <Route path="" element={<DummyRoute label="initial" />} />
          <Route path="" element={<DummyRoute label="destination" />} />
        </Routes>
        <DummyComponent />
      </>,
    );

    return { history };
  };

  const changeValueTo = async (value: "undefined" | "false" | "true") => {
    await userEvent.click(screen.getByRole("button", { name: value }));
  };

  it("wouldn't change the route when method when is rendered", () => {
    const { history } = renderHook({ to: true, from: false });

    expect(history.location.pathname).toBe("/");
  });

  it("wouldn't change the route when it changes to a value that is not to", async () => {
    const { history } = renderHook({ to: true, from: false });

    await changeValueTo("false");

    expect(history.location.pathname).toBe("/");
  });

  it("wouldn't change the route when value changes to a value that is not to", async () => {
    const { history } = renderHook({ to: true, from: false });

    await changeValueTo("false");

    expect(history.location.pathname).toBe("/");
  });

  it("wouldn't change the route when value changes from undefined to to", async () => {
    const { history } = renderHook({ to: true, from: false });

    await changeValueTo("undefined");
    await changeValueTo("true");

    expect(history.location.pathname).toBe("/");
  });

  it("would change the route when value changes from to to", async () => {
    const { history } = renderHook({ to: true, from: false });

    await changeValueTo("false");
    await changeValueTo("true");

    expect(history.location.pathname).toBe("/destination");
  });
});
