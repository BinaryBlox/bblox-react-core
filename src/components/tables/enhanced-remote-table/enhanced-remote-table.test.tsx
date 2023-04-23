import React from "react";
import { screen, render } from "@testing-library/react";
import { EnhancedRemoteDummyTable } from "./enhanced-remote-table.mock";
import userEvent from "@testing-library/user-event";
import { columns, Data, data } from "../enhanced-table/enhanced-table.mock";
import { expectProgressIndicator } from "~/tests/assertions";
import { vi } from "vitest";

function renderInstance({
  defaultSort = "startDate",
  loading = false,
}: { defaultSort?: keyof Data; loading?: boolean } = {}) {
  const onRequestSort = vi.fn();
  render(
    <EnhancedRemoteDummyTable
      data={data}
      columns={columns}
      defaultSort={defaultSort}
      defaultOrder="asc"
      loading={loading}
      onRequestSort={onRequestSort}
    />,
  );
  return { onRequestSort };
}

describe("Table", () => {
  it("all items are rendered in the correct", async () => {
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

  it("the defaultSort is indicated", () => {
    renderInstance();

    expect(screen.getByText(/date/i)).toHaveTextContent(/datesorted ascending/i);
    expect(screen.getByText(/name/i)).toHaveTextContent(/name/i);
    expect(screen.getByText(/garmin/i)).toHaveTextContent(/garmin/i);
  });

  describe("clicks 'Name'", () => {
    it("once onRequestSort will be called to sort by name in ascendent order", async () => {
      const { onRequestSort } = renderInstance();

      await userEvent.click(screen.getByText(/name/i));

      expect(screen.getByText(/date/i)).toHaveTextContent(/date/i);
      expect(screen.getByText(/name/i)).toHaveTextContent(/namesorted ascending/i);
      expect(screen.getByText(/garmin/i)).toHaveTextContent(/garmin/i);
      expect(onRequestSort).toHaveBeenCalledWith("name", "asc");
    });

    it("twice onRequestSort will be called twice to sort by name in ascendent and descendent order", async () => {
      const { onRequestSort } = renderInstance();

      await userEvent.click(screen.getByText(/name/i));
      await userEvent.click(screen.getByText(/name/i));

      expect(screen.getByText(/date/i)).toHaveTextContent(/date/i);
      expect(screen.getByText(/name/i)).toHaveTextContent(/namesorted descending/i);
      expect(screen.getByText(/garmin/i)).toHaveTextContent(/garmin/i);
      expect(onRequestSort).toHaveBeenCalledTimes(2);
      expect(onRequestSort).toHaveBeenCalledWith("name", "asc");
      expect(onRequestSort).toHaveBeenCalledWith("name", "desc");
    });
  });
});
