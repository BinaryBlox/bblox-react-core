import React from "react";
import { render } from "~/tests/testing-library";
import { screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import { TableRowOption, TableList } from "./table-list";
import { HeadCell } from "../../components/tables/enhanced-table";
import { BasicModelInstance } from "..";
import { expectProgressIndicator } from "~/tests/assertions";
import { vi } from "vitest";

const columns: HeadCell<BasicModelInstance>[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Item ID",
    sort: false,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "value",
    numeric: true,
    disablePadding: false,
    label: "Value",
    sort: true,
  },
];
const data: BasicModelInstance[] = [
  {
    id: "item-c",
    name: "fg Item 1",
    value: 1,
  },
  {
    id: "item-a",
    name: "aa Item 2",
    value: 2,
  },
  {
    id: "item-l",
    name: "ba Item 3",
    value: 3,
  },
  {
    id: "item-j",
    name: "aa Item 4",
    value: 4,
  },
  {
    id: "item-w",
    name: "cd Item 5",
    value: 5,
  },
];

const options = [
  {
    id: "edit",
    label: "Edit",
    onClick: vi.fn(),
  },
  {
    id: "remove",
    label: "Remove",
    onClick: vi.fn(),
  },
];

describe("TableList", () => {
  const renderInstance = ({
    search = false,
    defaultSort = "value",
    loading = false,
    options = undefined,
    onClick = vi.fn(),
  }: {
    defaultSort?: string;
    loading?: boolean;
    search?: boolean;
    options?: TableRowOption<BasicModelInstance>[];
    onClick?: jest.Mock;
  } = {}) => {
    const instance = render(
      <TableList
        search={search}
        data={data}
        columns={columns}
        defaultSort={defaultSort}
        defaultOrder="asc"
        loading={loading}
        options={options}
        onClick={onClick}
      />,
    );

    return { ...instance, onClick };
  };

  const openOptionsMenu = async (index = 0) => {
    await userEvents.click(screen.getAllByTestId("MoreVertIcon")[index]);
  };

  it("would render all items and its values", () => {
    renderInstance();

    data.forEach(({ id, name, value }) => {
      expect(screen.getByRole("cell", { name: id })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: name as string })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: value as string })).toBeInTheDocument();
    });
  });

  it("all items are rendered in the correct default order", async () => {
    renderInstance();

    [/item 1/i, /item 2/i, /item 3/i, /item 4/i, /item 5/i].forEach((item, index) => {
      expect(screen.getByRole("cell", { name: item })).toHaveAttribute(
        "aria-rowindex",
        index.toString(),
      );
    });
  });

  it("loading is true a loading indicator is displayed", () => {
    renderInstance({ loading: true });

    expectProgressIndicator();
  });

  describe("search", () => {
    it("would render a search input if search is true", () => {
      renderInstance({ search: true });

      expect(screen.getByRole("search")).toBeInTheDocument();
    });

    it("wouldn't render a search input if search is false", () => {
      renderInstance({ search: false });

      expect(screen.queryByRole("search")).not.toBeInTheDocument();
    });
  });

  describe("if I search an 'a'", () => {
    it("would render the items 2,3 and 4", async () => {
      renderInstance({ search: true });

      const search = screen.getByPlaceholderText(/search/i);
      await userEvents.type(search, "a");

      expect(screen.getByText(/item 2/i)).toBeInTheDocument();
      expect(screen.getByText(/item 3/i)).toBeInTheDocument();
      expect(screen.getByText(/item 4/i)).toBeInTheDocument();

      expect(screen.queryByText(/item 1/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/item 5/i)).not.toBeInTheDocument();

      await userEvents.clear(search);
    });

    it("would render all the items if I remove the search", async () => {
      renderInstance({ search: true });

      const search = screen.getByPlaceholderText(/search/i);
      await userEvents.type(search, "a");
      await userEvents.clear(search);

      expect(screen.getByText(/item 1/i)).toBeInTheDocument();
      expect(screen.getByText(/item 2/i)).toBeInTheDocument();
      expect(screen.getByText(/item 3/i)).toBeInTheDocument();
      expect(screen.getByText(/item 4/i)).toBeInTheDocument();
      expect(screen.getByText(/item 5/i)).toBeInTheDocument();
    });
  });

  describe("sort by a sortable column", () => {
    it("once it will be asc sorted", async () => {
      renderInstance();

      await userEvents.click(screen.getByText(/name/i));

      expect(screen.getByRole("cell", { name: /item 2/i })).toHaveAttribute("aria-rowindex", "0");
      expect(screen.getByRole("cell", { name: /item 4/i })).toHaveAttribute("aria-rowindex", "1");
      expect(screen.getByRole("cell", { name: /item 3/i })).toHaveAttribute("aria-rowindex", "2");
      expect(screen.getByRole("cell", { name: /item 5/i })).toHaveAttribute("aria-rowindex", "3");
      expect(screen.getByRole("cell", { name: /item 1/i })).toHaveAttribute("aria-rowindex", "4");
    });

    it("two times it will be desc sorted", async () => {
      renderInstance();

      await userEvents.click(screen.getByText(/name/i));
      await userEvents.click(screen.getByText(/name/i));

      expect(screen.getByRole("cell", { name: /item 1/i })).toHaveAttribute("aria-rowindex", "0");
      expect(screen.getByRole("cell", { name: /item 5/i })).toHaveAttribute("aria-rowindex", "1");
      expect(screen.getByRole("cell", { name: /item 3/i })).toHaveAttribute("aria-rowindex", "2");
      expect(screen.getByRole("cell", { name: /item 4/i })).toHaveAttribute("aria-rowindex", "3");
      expect(screen.getByRole("cell", { name: /item 2/i })).toHaveAttribute("aria-rowindex", "4");
    });
  });

  it("sort a non sortable column", async () => {
    renderInstance();

    await userEvents.click(screen.getByText(/id/i));

    expect(screen.getByRole("cell", { name: /item 1/i })).toHaveAttribute("aria-rowindex", "0");
    expect(screen.getByRole("cell", { name: /item 2/i })).toHaveAttribute("aria-rowindex", "1");
    expect(screen.getByRole("cell", { name: /item 3/i })).toHaveAttribute("aria-rowindex", "2");
    expect(screen.getByRole("cell", { name: /item 4/i })).toHaveAttribute("aria-rowindex", "3");
    expect(screen.getByRole("cell", { name: /item 5/i })).toHaveAttribute("aria-rowindex", "4");
  });

  it("would call onClick if a row is clicked", async () => {
    const { onClick } = renderInstance();

    await userEvents.click(screen.getByRole("row", { name: /item 3/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(data[2]);
  });

  it("would continue working if onClick is not defined and we click a row", async () => {
    renderInstance({ onClick: undefined });

    await userEvents.click(screen.getByRole("row", { name: /item 3/i }));
  });

  // TODO: this tests are throwing a console.error
  describe("options menu", () => {
    it("would render a button to open the menu if doesn't have options", () => {
      renderInstance({ options: undefined });

      expect(screen.queryByTestId("MoreVertIcon")).not.toBeInTheDocument();
    });

    it("would render a button to open the menu if has options", () => {
      renderInstance({ options });

      screen.getAllByTestId("MoreVertIcon");
    });

    it("would render a menu if has options", async () => {
      renderInstance({ options });

      await openOptionsMenu();

      expect(await screen.findByRole("menu")).toBeInTheDocument();
    });

    it.each([
      [/edit/i, 0],
      [/remove/i, 1],
    ])("would call the option onClick with the row if %s option is clicked", async (name, i) => {
      const index = 1;
      const item = data[index];
      const option = options[i];

      renderInstance({ options });

      await openOptionsMenu(index);

      await userEvents.click(screen.getByRole("menuitem", { name }));

      expect(option.onClick).toHaveBeenCalledTimes(1);
      expect(option.onClick).toHaveBeenCalledWith(item);
    });

    it("would close the menu when an option is clicked", async () => {
      const index = 1;

      renderInstance({ options });

      await openOptionsMenu(index);
      await userEvents.click(screen.getByRole("menuitem", { name: /edit/i }));

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("wouldn't call the component onClick if an option if clicked", async () => {
      const { onClick } = renderInstance({ options });

      await openOptionsMenu();

      await userEvents.click(screen.getByRole("menuitem", { name: /edit/i }));

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
