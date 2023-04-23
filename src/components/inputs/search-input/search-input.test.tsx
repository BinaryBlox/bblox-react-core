import React from "react";
import { render, screen } from "~/tests/testing-library";
import { SearchInput } from "./search-input";
import userEvent from "@testing-library/user-event";
import { pickDatetime, typeNumericInput } from "~/tests/actions";
import { assertCloseDate, AssertCloseDateUpTo } from "~/tests/assertions";
import { vi } from "vitest";

const datetimeFormat = "dd-MM-yyyy HH:mm:ss.SSS";
const createdBefore = new Date(2022, 2, 17, 12, 42);

describe("SearchInput", () => {
  const enterFullSearch = async () => {
    await userEvent.type(screen.getByRole("textbox", { name: /search/i }), "lorem ipsum");
    await userEvent.click(screen.getByTestId("TuneIcon"));
    await userEvent.type(screen.getByRole("textbox", { name: /subject/i }), "nice subject");
    typeNumericInput(screen.getByRole("spinbutton", { name: /amount/i }), 201);
    pickDatetime(
      screen.getByRole("textbox", { name: /created before/i }),
      createdBefore,
      datetimeFormat,
    );
    await userEvent.click(screen.getByLabelText(/has something/i));
  };

  const renderComponent = ({
    label = "search",
    placeholder,
  }: { label?: string; placeholder?: string } = {}) => {
    const onSearch = vi.fn();
    render(
      <SearchInput
        label={label}
        placeholder={placeholder}
        onSearch={onSearch}
        dateFormat={datetimeFormat}
        filters={[
          { id: "subject", type: "text", label: "Subject" },
          { id: "amount", type: "number", label: "Amount" },
          { id: "hasSomething", type: "boolean", label: "Has something" },
          { id: "createdBefore", type: "datetime", label: "Created before" },
        ]}
      />,
    );
    return { onSearch };
  };

  it("should render a label if has one", () => {
    renderComponent({ label: "the label" });

    expect(screen.getByRole("textbox", { name: /the label/i })).toBeVisible();
  });

  it("should render a placeholder if has one", () => {
    renderComponent({ placeholder: "the placeholder" });

    expect(screen.getByPlaceholderText(/the placeholder/i)).toBeVisible();
  });

  it("should render the filters if the filter button is clicked", async () => {
    renderComponent({ placeholder: "the placeholder" });

    await userEvent.click(screen.getByTestId("TuneIcon"));

    expect(screen.getByRole("textbox", { name: /subject/i })).toBeVisible();
    expect(screen.getByRole("spinbutton", { name: /amount/i })).toBeVisible();
    expect(screen.getByLabelText(/has something/i)).toBeInTheDocument();
  });

  it("should hide the filters if the filter button is clicked again", async () => {
    renderComponent({ placeholder: "the placeholder" });

    await userEvent.click(screen.getByTestId("TuneIcon"));
    await userEvent.click(screen.getByTestId("TuneIcon"));

    expect(screen.queryByRole("textbox", { name: /subject/i })).not.toBeInTheDocument();
  });

  it("should hide the filters if the close button is clicked", async () => {
    renderComponent({ placeholder: "the placeholder" });

    await userEvent.click(screen.getByTestId("TuneIcon"));
    await userEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByRole("textbox", { name: /subject/i })).not.toBeInTheDocument();
  });

  it("should crear the search if the clear button is clicked", async () => {
    renderComponent();

    await enterFullSearch();
    await userEvent.click(screen.getByTestId("ClearIcon"));

    expect(screen.getByRole("textbox", { name: /search/i })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: /subject/i })).toHaveValue("");
    expect(screen.getByRole("spinbutton", { name: /amount/i })).toHaveValue(0);
    expect(screen.getByLabelText(/has something/i)).not.toBeChecked();
  });

  describe("onSearch", () => {
    it("should be called when a search is submited", async () => {
      const { onSearch } = renderComponent();

      await userEvent.type(screen.getByRole("textbox", { name: /search/i }), "lorem ipsum");
      await userEvent.click(screen.getByTestId("SearchIcon"));

      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith({
        search: "lorem ipsum",
      });
    });

    it("should be called when a search with filters is submited using the enter button", async () => {
      const { onSearch } = renderComponent();

      await userEvent.type(screen.getByRole("textbox", { name: /search/i }), "lorem ipsum{enter}");

      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith({
        search: "lorem ipsum",
      });
    });

    it("should be called when a search with filters is submited", async () => {
      const { onSearch } = renderComponent();

      await enterFullSearch();
      await userEvent.click(screen.getByTestId("SearchIcon"));

      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith({
        search: "lorem ipsum",
        subject: "nice subject",
        amount: 201,
        hasSomething: true,
        createdBefore: expect.any(Date),
      });
      assertCloseDate(
        onSearch.mock.calls[0][0].createdBefore,
        createdBefore,
        AssertCloseDateUpTo.Seconds,
      );
    });

    it("should be called when a search with filters is submited using the secondary button", async () => {
      const { onSearch } = renderComponent();

      await enterFullSearch();
      await userEvent.click(screen.getByRole("button", { name: /search/i }));

      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith({
        search: "lorem ipsum",
        subject: "nice subject",
        amount: 201,
        hasSomething: true,
        createdBefore: expect.any(Date),
      });
      assertCloseDate(
        onSearch.mock.calls[0][0].createdBefore,
        createdBefore,
        AssertCloseDateUpTo.Seconds,
      );
    });
  });
});
