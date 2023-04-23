import React from "react";
import { render, screen, waitFor } from "~/tests/testing-library";
import { Board } from "./board";
import { mockMarkdownContent } from "~/tests/mocks/markdown.mock";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const content = "This is the content";

const content1 = "This is the content 1";
const content2 = "This is the content 2";
const content3 = "This is the content 3";
const arrayContent = [content1, content2, content3];

describe("Board", () => {
  const renderComponent = ({
    markdown,
    content,
  }: {
    markdown?: string;
    content?: string | string[];
  }) => {
    const copy = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: copy,
      },
    });
    render(<Board markdown={markdown} content={content} timeoutCopyText={100} />);

    return { copy };
  };

  it("should render a string content", () => {
    renderComponent({ content });

    expect(screen.getByText(content)).toBeVisible();
  });

  it("should render a array of string content", () => {
    renderComponent({ content: arrayContent });

    expect(screen.getByText(content1)).toBeVisible();
    expect(screen.getByText(content2)).toBeVisible();
    expect(screen.getByText(content3)).toBeVisible();
  });

  it.skip("should render a markdown content", () => {
    renderComponent({ markdown: mockMarkdownContent });

    expect(
      screen.getByRole("heading", { name: "Diu in illa Lavini atque de quoque", level: 5 }),
    ).toBeVisible();
  });

  it("should copy the string content to the clipboard if the copy button is clicked", async () => {
    const { copy } = renderComponent({ content });

    await userEvent.click(screen.getByRole("button"));

    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith(content);
  });

  it("should copy the string array content to the clipboard if the copy button is clicked", async () => {
    const expectedCopy = arrayContent.join("\n");
    const { copy } = renderComponent({ content: arrayContent });

    await userEvent.click(screen.getByRole("button"));

    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith(expectedCopy);
  });

  it.skip("should copy the markdown content to the clipboard if the copy button is clicked", async () => {
    const { copy } = renderComponent({ markdown: mockMarkdownContent });

    await userEvent.click(screen.getByRole("button"));

    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith(mockMarkdownContent);
  });

  it("should change the copy button text when is clicked", async () => {
    renderComponent({ content });

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button", { name: /copied/i })).toBeVisible();
  });

  it("should return to the original button text after a delay", async () => {
    renderComponent({ content });

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button", { name: /copied/i })).toBeVisible();

    await waitFor(() => expect(screen.getByRole("button", { name: /copy/i })).toBeVisible());
  });
});
