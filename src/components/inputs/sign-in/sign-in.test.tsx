import React from "react";
import { SignIn } from "./sign-in";
import { render, screen } from "~/tests/testing-library";
import userEvent from "@testing-library/user-event";
import { expectProgressIndicator } from "~/tests/assertions";
import { vi } from "vitest";

async function submitSignIn(email: string | null, password: string | null) {
  email && (await userEvent.type(screen.getByRole("input", { name: /email/i }), email));
  password && (await userEvent.type(screen.getByRole("input", { name: /password/i }), password));
  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
}

describe("SignIn", () => {
  it("the title is displayed", () => {
    render(<SignIn title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={() => null} />);
    expect(screen.getByText("Lorem ipsum")).toBeInTheDocument();
  });

  it("the subtitle is displayed", () => {
    render(<SignIn title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={() => null} />);
    expect(screen.getByText("Sit amet")).toBeInTheDocument();
  });

  it("if I enter an email and a password and I submit onSubmitSignIn is called", async () => {
    const onSubmitSignIn = vi.fn();
    render(<SignIn title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={onSubmitSignIn} />);

    await submitSignIn("test@example.com", "password1");

    expect(onSubmitSignIn).toHaveBeenCalledTimes(1);
    expect(onSubmitSignIn).toHaveBeenCalledWith("test@example.com", "password1");
  });

  it("if I don't enter an email and I submit an error is shown and onSubmitSignIn is not called", async () => {
    const onSubmitSignIn = vi.fn();
    render(<SignIn title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={onSubmitSignIn} />);

    await submitSignIn(null, "password1");

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(onSubmitSignIn).not.toHaveBeenCalled();
  });

  it("if I don't enter a valid email and I submit onSubmitSignIn is not called", async () => {
    const onSubmitSignIn = vi.fn();
    render(<SignIn title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={onSubmitSignIn} />);

    await submitSignIn("invalid.com", "password1");

    expect(onSubmitSignIn).not.toHaveBeenCalled();
  });

  it("if I don't enter an password and I submit an error is shown and onSubmitSignIn is not called", async () => {
    const onSubmitSignIn = vi.fn();
    render(<SignIn title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={onSubmitSignIn} />);

    await submitSignIn("test@example.com", null);

    expect(screen.getByText(/please fill out this field/i)).toBeInTheDocument();
    expect(onSubmitSignIn).not.toHaveBeenCalled();
  });

  it("if I have an error and I enter the fields the errors are removed when I submit", async () => {
    const onSubmitSignIn = vi.fn();
    render(<SignIn title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={onSubmitSignIn} />);

    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getAllByText(/please fill out this field/i)).toBeTruthy();

    await submitSignIn("test@example.com", "password1");

    expect(screen.queryByText(/please fill out this field/i)).not.toBeInTheDocument();
    expect(onSubmitSignIn).toHaveBeenCalledTimes(1);
    expect(onSubmitSignIn).toHaveBeenCalledWith("test@example.com", "password1");
  });

  describe("if loading is true", () => {
    it("the inputs and buttons are disabled", () => {
      render(
        <SignIn loading title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={() => null} />,
      );

      expect(screen.getByRole("input", { name: /email/i })).toBeDisabled();
      expect(screen.getByRole("input", { name: /password/i })).toBeDisabled();
      expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
    });

    it("a loading spinner appears", () => {
      render(
        <SignIn loading title="Lorem ipsum" subtitle="Sit amet" onSubmitSignIn={() => null} />,
      );

      expectProgressIndicator();
    });
  });
});
