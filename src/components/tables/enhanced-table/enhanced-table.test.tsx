import React from "react";
import { render } from "~/tests/testing-library";
import { screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import { TestTable, columns, data, Data } from "./enhanced-table.mock";
import { expectProgressIndicator } from "~/tests/assertions";

const renderInstance = ({
  defaultSort = "startDate",
  loading = false,
}: { defaultSort?: keyof Data; loading?: boolean } = {}) => {
  return render(
    <TestTable
      data={data}
      columns={columns}
      defaultSort={defaultSort}
      defaultOrder="asc"
      loading={loading}
    />,
  );
};

describe("EnhancedTable", () => {
  it("all items are rendered in the correct order", async () => {
    renderInstance();

    expect(screen.getByText("Tabata")).toBeInTheDocument();
    expect(screen.getByText("AMRAPx2")).toBeInTheDocument();
    expect(screen.getByText("HIIT")).toBeInTheDocument();
    expect(screen.getByText("on/off x 1")).toBeInTheDocument();
    expect(screen.getByText("EMOM 30'")).toBeInTheDocument();
  });

  it("loading is true a loading indicator is displayed", () => {
    renderInstance({ loading: true });

    expectProgressIndicator();
  });

  it("all items are sorted by the default sort field", () => {
    renderInstance({ defaultSort: "startDate" });

    const rows = screen.queryAllByRole("row");
    expect(rows[1]).toHaveTextContent("on/off x 1105/04/2022");
    expect(rows[2]).toHaveTextContent("EMOM 30'307/04/2022");
    expect(rows[3]).toHaveTextContent("Tabata409/04/2022");
    expect(rows[4]).toHaveTextContent("AMRAPx2510/04/2022");
    expect(rows[5]).toHaveTextContent("HIIT211/04/2022");
  });

  describe("if I search an 'a'", () => {
    it("only the Tabata and AMRAPx2 items appear", async () => {
      renderInstance();

      await userEvents.type(screen.getByPlaceholderText(/search/i), "a");

      expect(screen.getByText("Tabata")).toBeInTheDocument();
      expect(screen.getByText("AMRAPx2")).toBeInTheDocument();

      expect(screen.queryByText("HIIT")).not.toBeInTheDocument();
      expect(screen.queryByText("on/off x 1")).not.toBeInTheDocument();
      expect(screen.queryByText("EMOM 30'")).not.toBeInTheDocument();
    });

    it("and remove the search all items appear", async () => {
      renderInstance();

      const search = screen.getByPlaceholderText(/search/i);
      await userEvents.type(search, "a");
      await userEvents.clear(search);

      expect(screen.getByText("Tabata")).toBeInTheDocument();
      expect(screen.getByText("AMRAPx2")).toBeInTheDocument();
      expect(screen.getByText("HIIT")).toBeInTheDocument();
      expect(screen.getByText("on/off x 1")).toBeInTheDocument();
      expect(screen.getByText("EMOM 30'")).toBeInTheDocument();
    });
  });

  describe("If I click 'Garmin ID'", () => {
    it("once it will be asc sorted", async () => {
      renderInstance();

      await userEvents.click(screen.getByText(/garmin id/i));

      const rows = screen.queryAllByRole("row");
      expect(rows[1]).toHaveTextContent("on/off x 1105/04/2022");
      expect(rows[2]).toHaveTextContent("HIIT211/04/2022");
      expect(rows[3]).toHaveTextContent("EMOM 30'307/04/2022");
      expect(rows[4]).toHaveTextContent("Tabata409/04/2022");
      expect(rows[5]).toHaveTextContent("AMRAPx2510/04/2022");
    });

    it("two times it will be desc sorted", async () => {
      renderInstance();

      await userEvents.click(screen.getByText(/garmin id/i));
      await userEvents.click(screen.getByText(/garmin id/i));

      const rows = screen.queryAllByRole("row");
      expect(rows[1]).toHaveTextContent("AMRAPx2510/04/2022");
      expect(rows[2]).toHaveTextContent("Tabata409/04/2022");
      expect(rows[3]).toHaveTextContent("EMOM 30'307/04/2022");
      expect(rows[4]).toHaveTextContent("HIIT211/04/2022");
      expect(rows[5]).toHaveTextContent("on/off x 1105/04/2022");
    });
  });
});
