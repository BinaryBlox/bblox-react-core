import React, { useState } from "react";
import { DummyModelRouter, InternalModelRouter } from "./stories/model-router.stories";
import { vi } from "vitest";
import { data, data as mockData } from "./stories/templates";
import userEvent from "@testing-library/user-event";
import { getRandomItem } from "../../utils";
import { Model } from "../generators.model";
import {
  BirthDateFormat,
  createModelInstance,
  MockInstance,
  mockModel,
  ReturnTimeFormat,
  TradeDateFormat,
} from "../generators.mock";
import { NotificationCenterProvider } from "../../providers";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { render, screen, TestRouter } from "~/tests/testing-library";
import { AddScreen, ListScreen, UpdateScreen } from "./screens";
import { IdleRequest, LoadingRequest, SuccessRequest } from "./model-router.types";
import {
  clearCheckbox,
  clearMultiSelect,
  selectOption,
  typeNumericInput,
  pickDatetime,
  selectOptions,
} from "~/tests/actions";
import {
  expectProgressIndicator,
  waitForProgressIndicatorToBeRemoved,
  expectModelFieldInputExist,
  expectModelFieldInputValue,
  expectToHaveBeenCalledOnceWithMockInstance,
  expectAlert,
  expectModelFieldValue,
} from "~/tests/assertions";
import { mockConsoleWarn } from "~/tests/mocks";

const REQUEST_TIMEOUT = 20;

describe("ModelRouter", () => {
  const assertions = {
    expectListScreen: async () =>
      await screen.findByRole("heading", {
        name: "Items",
        level: 1,
      }),
    expectAddScreen: async () =>
      await screen.findByRole("heading", {
        name: "Add Items",
        level: 1,
      }),
    expectNotToBeInAddScreen: () => {
      expect(
        screen.queryByRole("heading", {
          name: "Add Items",
          level: 1,
        }),
      ).not.toBeInTheDocument();
    },
    expectDetailScreen: async ({ id }: { id: string }) =>
      await screen.findByRole("heading", {
        name: id,
        level: 1,
      }),
    expectNotToBeInDetailsScreen: ({ id }: { id: string }) => {
      expect(
        screen.queryByRole("heading", {
          name: id,
          level: 1,
        }),
      ).not.toBeInTheDocument();
    },
    expectUpdateScreen: async ({ id }: { id: string }) =>
      await screen.findByRole("heading", {
        name: `Edit ${id}`,
        level: 1,
      }),
    expectNotToBeInUpdateScreen: ({ id }: { id: string }) =>
      expect(
        screen.queryByRole("heading", {
          name: `Edit ${id}`,
          level: 1,
        }),
      ).not.toBeInTheDocument(),
    expectListItems: async ({ data, model }: { data: MockInstance[]; model: Model }) => {
      for (let i = 0; i < model.fields.length; ++i) {
        const { listable, id } = model.fields[i];

        if (listable) {
          const name = data[i][id] as string;
          expect(await screen.findAllByRole("cell", { name })).toBeTruthy();
        }
      }
    },
    expectMenuOption: async ({ id }: { id: string }) => {
      await screen.findByTestId(`options-${id}`);
    },
    expectNotToHaveMenuOption: ({ id }: { id: string }) => {
      expect(screen.queryByTestId(`options-${id}`)).not.toBeInTheDocument();
    },
  };

  const actions = {
    navigateToAddScreen: async () => {
      await userEvent.click(await screen.findByRole("button", { name: "Add" }));
    },
    forceNavigateToAddScreen: async () => {
      await userEvent.click(screen.getByRole("button", { name: /force add/i }));
    },
    navigateToUpdateScreen: async ({ id }: { id: string }) => {
      await actions.openItemOptions({ id });
      await userEvent.click(screen.getByRole("menuitem", { name: /edit/i }));
    },
    forceNavigateToUpdateScreen: async () => {
      await userEvent.click(screen.getByRole("button", { name: /force update/i }));
    },
    navigateToDetailScreen: async ({ name }: { name: string }) => {
      await userEvent.click(await screen.findByRole("cell", { name }));
    },
    navigateToInternal: async () => {
      await userEvent.click(screen.getByRole("button", { name: /go to internal/i }));
    },
    forceNavigateToDetailsScreen: async () => {
      await userEvent.click(screen.getByRole("button", { name: /force details/i }));
    },
    openItemOptions: async ({ id }: { id: string }) => {
      await userEvent.click(await screen.findByTestId(`options-${id}`));
    },
    fullfillModelForm: async ({
      model,
      submit,
      clear,
    }: {
      model: Model;
      submit?: boolean;
      clear?: boolean;
    }) => {
      const instance = createModelInstance<MockInstance>(model);

      const idElement = screen.getByRole("textbox", { name: "Id" });
      const firstNameElement = screen.getByRole("textbox", { name: /first name/i });
      const middleNameElement = screen.getByRole("textbox", { name: /middle name/i });
      const lastNameElement = screen.getByRole("textbox", { name: /last name/i });
      const genderElement = screen.getByRole("button", { name: /gender/i });
      const ageElement = screen.getByRole("spinbutton", { name: /age/i });
      const birthDateElement = screen.getByRole<HTMLInputElement>("textbox", {
        name: /birth date/i,
      });
      const manufacturerElement = screen.getByRole("button", { name: /manufacturer/i });
      const modelElement = screen.getByRole("button", { name: /model/i });
      const colorElement = screen.getByRole("textbox", { name: /color/i });
      const typeElement = screen.getByRole("button", { name: /type/i });
      const vinElement = screen.getByRole("textbox", { name: /vin/i });
      const vrmElement = screen.getByRole("textbox", { name: /vrm/i });
      const timeReturnElement = screen.getByRole<HTMLInputElement>("textbox", {
        name: /return time/i,
      });
      const quantityElement = screen.getByRole("spinbutton", { name: /q/i });
      const availableElement = screen.getByRole<HTMLInputElement>("checkbox", {
        name: /available/i,
      });
      const currencyElement = screen.getByRole("textbox", { name: /currency/i });
      const tradeDateElement = screen.getByRole<HTMLInputElement>("textbox", {
        name: /trade date/i,
      });
      const codesElement = screen.getByRole("textbox", { name: /codes/i });
      const identifiersElement = screen.getByRole("textbox", { name: /identifiers/i });

      if (clear) {
        await userEvent.clear(idElement);
        await userEvent.clear(firstNameElement);
        await userEvent.clear(middleNameElement);
        await userEvent.clear(lastNameElement);
        await userEvent.clear(birthDateElement);
        await userEvent.clear(colorElement);
        await userEvent.clear(vinElement);
        await userEvent.clear(vrmElement);
        await userEvent.clear(availableElement);
        await userEvent.clear(currencyElement);
        await userEvent.clear(tradeDateElement);
        await userEvent.clear(timeReturnElement);
        await userEvent.clear(codesElement);
        await userEvent.clear(identifiersElement);
        await clearCheckbox(availableElement);
        await clearMultiSelect(typeElement);
      }
      await userEvent.type(idElement, instance.id);
      await userEvent.type(firstNameElement, instance.firstName);
      await userEvent.type(middleNameElement, instance.middleName);
      await userEvent.type(lastNameElement, instance.lastName);
      await selectOption(genderElement, instance.gender);
      typeNumericInput(ageElement, instance.age);
      pickDatetime(birthDateElement, instance.birthDate, BirthDateFormat);
      await selectOption(modelElement, instance.car.model);
      await selectOption(manufacturerElement, instance.car.manufacturer);
      await userEvent.type(colorElement, instance.car.color);
      await selectOptions(typeElement, instance.car.type);
      await userEvent.type(vinElement, instance.car.vin);
      await userEvent.type(vrmElement, instance.car.vrm);
      pickDatetime(timeReturnElement, instance.car.returnTime, ReturnTimeFormat);
      typeNumericInput(quantityElement, instance.quantity);
      if (instance.available) {
        await userEvent.click(availableElement);
      }
      await userEvent.type(currencyElement, instance.currency);
      pickDatetime(tradeDateElement, instance.tradeDate, TradeDateFormat);
      await userEvent.type(codesElement, instance.codes.join(","));
      await userEvent.type(identifiersElement, instance.identifiers.join(","));

      submit && (await userEvent.click(screen.getByRole("button", { name: /save/i })));

      return instance;
    },
  };

  const renderComponent = async ({
    router = "memory",
    screen = "initial",
    deleteFeature,
    updateFeature,
    addFeature,
    detailsFeature,
  }: {
    router?: TestRouter;
    screen?: "initial" | "add" | "details" | "update";
    deleteFeature?: boolean;
    updateFeature?: boolean;
    addFeature?: boolean;
    detailsFeature?: boolean;
  } = {}) => {
    const onRequestList = vi.fn();
    const onRequestItem = vi.fn();
    const onSubmitNewItem = vi.fn();
    const onRequestUpdateItem = vi.fn();
    const onSubmitUpdate = vi.fn();
    const onRequestDelete = vi.fn();
    const randomItem = getRandomItem(data);

    const ForceNavigationComponent = ({ id }: { id: string }) => {
      const navigate = useNavigate();

      return (
        <Box>
          <Button onClick={() => navigate(`/${id}/update`)}>Force update</Button>
          <Button onClick={() => navigate("/add")}>Force add</Button>
          <Button onClick={() => navigate(`/${id}`)}>Force details</Button>
        </Box>
      );
    };

    const instance = render(
      <NotificationCenterProvider>
        <DummyModelRouter
          deleteFeature={deleteFeature}
          updateFeature={updateFeature}
          addFeature={addFeature}
          detailsFeature={detailsFeature}
          requestTimeout={REQUEST_TIMEOUT}
          onRequestListAction={onRequestList}
          onRequestItem={onRequestItem}
          onSubmitNewItemAction={onSubmitNewItem}
          onRequestUpdateItemAction={onRequestUpdateItem}
          onSubmitUpdateAction={onSubmitUpdate}
          onRequestDeleteAction={onRequestDelete}
          initialData={data}
        />
        <ForceNavigationComponent id={randomItem.item.id} />
      </NotificationCenterProvider>,
      {
        router,
      },
    );

    if (screen === "add") {
      await actions.navigateToAddScreen();
    } else if (screen === "details") {
      await actions.navigateToDetailScreen({ name: randomItem.item.firstName });
    } else if (screen === "update") {
      await actions.navigateToUpdateScreen({ id: randomItem.item.id });
    }

    return {
      ...instance,
      data,
      model: mockModel,
      randomItem,
      onRequestList,
      onRequestItem,
      onSubmitNewItem,
      onRequestUpdateItem,
      onSubmitUpdate,
      onRequestDelete,
    };
  };

  const renderComponentInsideRouter = () => {
    render(
      <NotificationCenterProvider>
        <InternalModelRouter />
      </NotificationCenterProvider>,
      { router: "memory" },
    );
  };

  const renderListScreen = () => {
    const error = "Lorem ipsum error";

    const TestComponent = () => {
      const [deleteRequest, setDeleteRequest] = useState(IdleRequest);

      return (
        <NotificationCenterProvider>
          <ListScreen
            onRequestList={vi.fn()}
            listData={[]}
            onClickDeleteItem={vi.fn()}
            listRequest={IdleRequest}
            deleteRequest={deleteRequest}
            modelName="Items"
            model={mockModel}
          />
          <Box>
            <Button onClick={() => setDeleteRequest(IdleRequest)}>idle</Button>
            <Button onClick={() => setDeleteRequest(LoadingRequest)}>loading</Button>
            <Button onClick={() => setDeleteRequest(SuccessRequest)}>success</Button>
            <Button onClick={() => setDeleteRequest({ error })}>error</Button>
          </Box>
        </NotificationCenterProvider>
      );
    };

    const instance = render(<TestComponent />);

    return { ...instance, error, model: mockModel };
  };

  const renderAddScreen = () => {
    const error = "Lorem ipsum error";

    const TestComponent = () => {
      const [newItemRequest, setNewItemRequest] = useState(IdleRequest);

      return (
        <NotificationCenterProvider>
          <AddScreen
            modelName="Items"
            model={mockModel}
            onSubmitNewItem={vi.fn()}
            newItemRequest={newItemRequest}
          />
          <Box>
            <Button onClick={() => setNewItemRequest(IdleRequest)}>idle</Button>
            <Button onClick={() => setNewItemRequest(LoadingRequest)}>loading</Button>
            <Button onClick={() => setNewItemRequest(SuccessRequest)}>success</Button>
            <Button onClick={() => setNewItemRequest({ error })}>error</Button>
          </Box>
        </NotificationCenterProvider>
      );
    };

    const instance = render(<TestComponent />, { router: "router" });

    return { ...instance, error, model: mockModel };
  };

  const renderUpdateScreen = () => {
    const error = "Lorem ipsum error";

    const TestComponent = () => {
      const [updateRequest, setUpdateRequest] = useState(IdleRequest);

      return (
        <NotificationCenterProvider>
          <UpdateScreen
            modelName="Items"
            model={mockModel}
            onSubmitUpdateItem={vi.fn()}
            submitUpdateItemRequest={updateRequest}
            updateItemRequest={IdleRequest}
            onRequestUpdateItem={vi.fn()}
          />
          <Box>
            <Button onClick={() => setUpdateRequest(IdleRequest)}>idle</Button>
            <Button onClick={() => setUpdateRequest(LoadingRequest)}>loading</Button>
            <Button onClick={() => setUpdateRequest(SuccessRequest)}>success</Button>
            <Button onClick={() => setUpdateRequest({ error })}>error</Button>
          </Box>
        </NotificationCenterProvider>
      );
    };

    const instance = render(<TestComponent />, { router: "router" });

    return { ...instance, error, model: mockModel };
  };

  describe("router screens", () => {
    it("would render the list screen by default", async () => {
      await renderComponent();

      await assertions.expectListScreen();
    });

    it("would render the add screen if we navigate there", async () => {
      await renderComponent();

      await actions.navigateToAddScreen();

      await assertions.expectAddScreen();
    });

    it("would render the update screen if we navigate there", async () => {
      const { data } = await renderComponent();
      const { item } = getRandomItem<MockInstance>(data);
      const { id } = item;

      await actions.navigateToUpdateScreen({ id });

      await assertions.expectUpdateScreen({ id });
    });

    it("would render the detail screen if we navigate there", async () => {
      const { data } = await renderComponent();
      const {
        item: { id, firstName },
      } = getRandomItem<MockInstance>(data);

      await actions.navigateToDetailScreen({ name: firstName });

      await assertions.expectDetailScreen({ id });
    });
  });

  describe("router paths", () => {
    it("would have the pathname / by default", async () => {
      const { history } = await renderComponent({ router: "router" });

      expect(history.location.pathname).toBe("/");
    });

    it("would have the path /add if navigates to the add screen", async () => {
      const { history } = await renderComponent({ router: "router" });

      await actions.navigateToAddScreen();

      expect(history.location.pathname).toBe("/add");
    });

    it("would have the path /:id/update if navigates to the update an item", async () => {
      const { history, data } = await renderComponent({ router: "router" });
      const {
        item: { id },
      } = getRandomItem<MockInstance>(data);

      await actions.navigateToUpdateScreen({ id });

      expect(history.location.pathname).toBe(`/${id}/update`);
    });

    it("would have the path /:id if navigates to the item details", async () => {
      const { history, data } = await renderComponent({ router: "router" });
      const {
        item: { id, firstName },
      } = getRandomItem<MockInstance>(data);

      await actions.navigateToDetailScreen({ name: firstName });

      expect(history.location.pathname).toBe(`/${id}`);
    });
  });

  describe("inside another router", () => {
    it("would navigate to the add screen", async () => {
      renderComponentInsideRouter();

      await actions.navigateToInternal();
      await actions.navigateToAddScreen();

      await assertions.expectAddScreen();
    });

    it("would be able to go back to the list sreen from the add screen", async () => {
      renderComponentInsideRouter();

      await actions.navigateToInternal();
      await actions.navigateToAddScreen();
      await userEvent.click(screen.getByRole("link", { name: "Items" }));

      await assertions.expectListScreen();
    });

    it("would navigate to the add screen if I click the navigaiton path", async () => {
      renderComponentInsideRouter();

      await actions.navigateToInternal();
      await actions.navigateToAddScreen();
      await userEvent.click(screen.getByRole("link", { name: "Add new Items" }));

      await assertions.expectAddScreen();
    });

    it("would navigate to the detail screen", async () => {
      renderComponentInsideRouter();
      const {
        item: { id, firstName },
      } = getRandomItem<MockInstance>(mockData);

      await actions.navigateToInternal();
      await actions.navigateToDetailScreen({ name: firstName });

      await assertions.expectDetailScreen({ id });
    });

    it("would be able to go back to the list sreen from the details screen", async () => {
      renderComponentInsideRouter();
      const {
        item: { firstName },
      } = getRandomItem<MockInstance>(mockData);

      await actions.navigateToInternal();
      await actions.navigateToDetailScreen({ name: firstName });
      await userEvent.click(screen.getByRole("link", { name: "Items" }));

      await assertions.expectListScreen();
    });

    it("would navigate to the add screen if I click the navigation path", async () => {
      renderComponentInsideRouter();
      const {
        item: { id, firstName },
      } = getRandomItem<MockInstance>(mockData);

      await actions.navigateToInternal();
      await actions.navigateToDetailScreen({ name: firstName });
      await userEvent.click(screen.getByRole("link", { name: id }));

      await assertions.expectDetailScreen({ id });
    });

    it("would navigate to the update screen", async () => {
      renderComponentInsideRouter();
      const {
        item: { id },
      } = getRandomItem<MockInstance>(mockData);

      await actions.navigateToInternal();
      await actions.navigateToUpdateScreen({ id });

      await assertions.expectUpdateScreen({ id });
    });

    it("would be able to go back to the list sreen from the details screen", async () => {
      renderComponentInsideRouter();
      const {
        item: { id },
      } = getRandomItem<MockInstance>(mockData);

      await actions.navigateToInternal();
      await actions.navigateToUpdateScreen({ id });
      await userEvent.click(screen.getByRole("link", { name: "Items" }));

      await assertions.expectListScreen();
    });

    it("would navigate to the add screen if I click the navigation path", async () => {
      renderComponentInsideRouter();
      const {
        item: { id },
      } = getRandomItem<MockInstance>(mockData);

      await actions.navigateToInternal();
      await actions.navigateToUpdateScreen({ id });
      await userEvent.click(screen.getByRole("link", { name: `Edit ${id}` }));

      await assertions.expectUpdateScreen({ id });
    });
  });

  describe("list screen", () => {
    it("would call onRequestList when is mounted", async () => {
      const { onRequestList } = await renderComponent();

      expect(onRequestList).toHaveBeenCalledTimes(1);
    });

    it("would render a loading indicator until the data is ready", async () => {
      await renderComponent();

      expectProgressIndicator();
      await waitForProgressIndicatorToBeRemoved();
    });

    it("would render a title", async () => {
      await renderComponent();

      expect(
        screen.getByRole("heading", {
          name: "Items",
          level: 1,
        }),
      ).toBeInTheDocument();
    });

    describe("add button", () => {
      it("would render an add button", async () => {
        await renderComponent();

        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      });

      it("would navigate to the add screen if I press the add button", async () => {
        const { history } = await renderComponent({ router: "router" });

        await userEvent.click(screen.getByRole("button", { name: "Add" }));

        expect(history.location.pathname).toBe("/add");
      });
    });

    it("would render a list with the data", async () => {
      const { data, model } = await renderComponent();

      await assertions.expectListItems({ data, model });
    });

    it("would navigate to the detail screen if an item is clicked", async () => {
      const { data, history } = await renderComponent({ router: "router" });
      const {
        item: { id, firstName },
      } = getRandomItem<MockInstance>(data);

      await userEvent.click(await screen.findByRole("cell", { name: firstName }));

      expect(history.location.pathname).toBe(`/${id}`);
    });

    describe("item options", () => {
      it("would have a options button for each item", async () => {
        const { data } = await renderComponent();

        for (let i = 0; i < data.length; ++i) {
          const id = data[i].id;
          await assertions.expectMenuOption({ id });
        }
      });

      it("would render an option to edit", async () => {
        const { data } = await renderComponent({ router: "router" });
        const {
          item: { id },
        } = getRandomItem<MockInstance>(data);

        await actions.openItemOptions({ id });

        expect(screen.getByRole("menuitem", { name: /edit/i })).toBeInTheDocument();
      });

      it("would render an option to delete", async () => {
        const { data } = await renderComponent({ router: "router" });
        const {
          item: { id },
        } = getRandomItem<MockInstance>(data);

        await actions.openItemOptions({ id });

        expect(screen.getByRole("menuitem", { name: /remove/i })).toBeInTheDocument();
      });
    });
  });

  describe("add screen", () => {
    it("would render a title", async () => {
      await renderComponent({ screen: "add" });

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /add items/i,
        }),
      );
    });

    it("would render the navigation path", async () => {
      await renderComponent({ screen: "add" });

      expect(screen.getByRole("link", { name: "Items" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Add new Items" })).toBeInTheDocument();
    });

    it("would be able to go back to the list screen", async () => {
      await renderComponent({ screen: "add" });

      await userEvent.click(screen.getByRole("link", { name: "Items" }));

      await assertions.expectListScreen();
    });

    it("would render a form", async () => {
      const { model } = await renderComponent({ screen: "add" });

      expectModelFieldInputExist(model.fields);
    });

    it("would be able to fullfill the form", async () => {
      const { model } = await renderComponent({ screen: "add" });

      const newInstance = await actions.fullfillModelForm({ model, submit: false });

      expectModelFieldInputValue(model.fields, newInstance);
    });

    it("would make a request when the form is submitted", async () => {
      const { onSubmitNewItem, model } = await renderComponent({ screen: "add" });

      const newInstance = await actions.fullfillModelForm({ model, submit: true });

      expectToHaveBeenCalledOnceWithMockInstance(onSubmitNewItem, {
        ...newInstance,
      });
    });

    it("would show a loading indicator when the request is in progress", async () => {
      const { model } = await renderComponent({ screen: "add" });

      await actions.fullfillModelForm({ model, submit: true });

      expectProgressIndicator();
    });

    it("would show a success message if the request finish with a success", async () => {
      renderAddScreen();

      await userEvent.click(screen.getByRole("button", { name: /success/i }));

      await expectAlert({
        message: /item added successfully/i,
        severity: "success",
      });
    });

    it("would navigate to the list screen if the request finish with a success", async () => {
      const { history } = renderAddScreen();

      await userEvent.click(screen.getByRole("button", { name: /success/i }));

      expect(history.location.pathname).toBe("/");
    });

    it("would show an error message if the request finish with an error", async () => {
      const { error } = renderAddScreen();

      await userEvent.click(screen.getByRole("button", { name: /error/i }));

      await expectAlert({
        title: /we had an error/i,
        message: error,
        severity: "error",
      });
    });
  });

  describe("details screen", () => {
    it("would render a title", async () => {
      const {
        randomItem: {
          item: { id },
        },
      } = await renderComponent({ screen: "details" });

      expect(
        screen.getByRole("heading", {
          name: id,
          level: 1,
        }),
      );
    });

    it("would be able to go back to the list screen", async () => {
      await renderComponent({ screen: "details" });

      await userEvent.click(
        screen.getByRole("link", {
          name: /items/i,
        }),
      );

      await assertions.expectListScreen();
    });

    it("would call onRequestItem when is mounted", async () => {
      const {
        onRequestItem,
        randomItem: {
          item: { id },
        },
      } = await renderComponent({ screen: "details" });

      expect(onRequestItem).toHaveBeenCalledTimes(1);
      expect(onRequestItem).toHaveBeenCalledWith(id);
    });

    it.skip("would show a loading indicator when the request is in progress", async () => {
      await renderComponent({ screen: "details" });

      expectProgressIndicator();
    });

    it.skip("would show the details of an instance", async () => {
      const { model, randomItem } = await renderComponent({ screen: "details" });

      await waitForProgressIndicatorToBeRemoved();

      model.fields.forEach((detail) => expectModelFieldValue(detail, randomItem.item));
    });
  });

  describe("update screen", () => {
    it("would render a title", async () => {
      const {
        randomItem: {
          item: { id },
        },
      } = await renderComponent({ screen: "update" });

      expect(
        screen.getByRole("heading", {
          name: `Edit ${id}`,
          level: 1,
        }),
      ).toBeInTheDocument();
    });

    it("would render the navigation path", async () => {
      const {
        randomItem: {
          item: { id },
        },
      } = await renderComponent({ screen: "update" });

      expect(
        screen.getByRole("link", {
          name: /items/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: `Edit ${id}`,
        }),
      ).toBeInTheDocument();
    });

    it("would be able to go back to the list screen", async () => {
      await renderComponent({ screen: "update" });

      await userEvent.click(
        screen.getByRole("link", {
          name: /Items/i,
        }),
      );

      await assertions.expectListScreen();
    });

    it("would make a request to retrive the instance to update", async () => {
      const {
        onRequestUpdateItem,
        randomItem: {
          item: { id },
        },
      } = await renderComponent({ screen: "update" });

      expect(onRequestUpdateItem).toHaveBeenCalledTimes(1);
      expect(onRequestUpdateItem).toHaveBeenCalledWith(id);
    });

    it.skip("would show a loading indicator while the instance is requested", async () => {
      await renderComponent({ screen: "update" });

      await expectProgressIndicator();
    });

    it.skip("would render a form with the instance values", async () => {
      const {
        model,
        randomItem: { item },
      } = await renderComponent({ screen: "update" });

      await waitForProgressIndicatorToBeRemoved();

      expectModelFieldInputValue(model.fields, item);
    });

    it.skip("would make a request with the new values when the form is submitted", async () => {
      const { model, onSubmitUpdate } = await renderComponent({ screen: "update" });

      await waitForProgressIndicatorToBeRemoved();
      const newInstance = await actions.fullfillModelForm({ model, clear: true, submit: true });

      expectToHaveBeenCalledOnceWithMockInstance(onSubmitUpdate, newInstance);
    });

    it.skip("would show a loading indicator while the submit request is in progress", async () => {
      const { model } = await renderComponent({ screen: "update" });

      await waitForProgressIndicatorToBeRemoved();
      await actions.fullfillModelForm({ model, submit: true });

      expectProgressIndicator();
    });

    it("would show a success message if the request finish with a success", async () => {
      renderUpdateScreen();

      await userEvent.click(screen.getByRole("button", { name: /success/i }));

      await expectAlert({
        title: /item updated/i,
        message: /has been updated successfully/i,
        severity: "success",
      });
    });

    it("would navigate to the list screen if the request finish with a success", async () => {
      const { history } = renderUpdateScreen();

      await userEvent.click(screen.getByRole("button", { name: /success/i }));

      expect(history.location.pathname).toBe("/");
    });

    it("would show an error message if the request finish with an error", async () => {
      const { error } = renderUpdateScreen();

      await userEvent.click(screen.getByRole("button", { name: /error/i }));

      await expectAlert({
        title: /we had an error/i,
        message: error,
        severity: "error",
      });
    });
  });

  describe("delete item", () => {
    it("would make a request when we try to delete an option", async () => {
      const { data, onRequestDelete } = await renderComponent();

      const { item } = getRandomItem<MockInstance>(data);
      const { id, firstName } = item;

      await screen.findByRole("cell", { name: firstName });

      await actions.openItemOptions({ id });

      await userEvent.click(screen.getByRole("menuitem", { name: /remove/i }));

      expect(onRequestDelete).toHaveBeenCalledTimes(1);
      expect(onRequestDelete).toHaveBeenCalledWith(item);
    });

    it("would show a loading indicator while the request is in progress", async () => {
      const { data } = await renderComponent();

      const { item } = getRandomItem<MockInstance>(data);
      const { id, firstName } = item;

      await screen.findByRole("cell", { name: firstName });
      await actions.openItemOptions({ id });
      await userEvent.click(screen.getByRole("menuitem", { name: /remove/i }));

      expectProgressIndicator();
    });

    it("would remove the item from the list when the request finish", async () => {
      const { data } = await renderComponent();
      const { item } = getRandomItem<MockInstance>(data);
      const { id, firstName } = item;

      await screen.findByRole("cell", { name: firstName });
      await actions.openItemOptions({ id });
      await userEvent.click(screen.getByRole("menuitem", { name: /remove/i }));
      await waitForProgressIndicatorToBeRemoved();

      expect(screen.queryByRole("cell", { name: firstName })).not.toBeInTheDocument();
    });

    it("would show a success message if the delete request finish with a success", async () => {
      renderListScreen();

      await userEvent.click(screen.getByRole("button", { name: /success/i }));

      await expectAlert({
        title: /item deleted/i,
        message: /the item has been deleted successfully/i,
        severity: "success",
      });
    });

    it("would show a error message if the delete request finish with an error", async () => {
      const { error } = renderListScreen();

      await userEvent.click(screen.getByRole("button", { name: /error/i }));

      await expectAlert({
        title: /we had an error/i,
        message: error,
        severity: "error",
      });
    });
  });

  describe("modifying enabled features", () => {
    describe("deleteFeature disabled", () => {
      it("wouldn't have an option to remove an item from the list", async () => {
        const { data } = await renderComponent({ deleteFeature: false });
        const {
          item: { id, firstName },
        } = getRandomItem<MockInstance>(data);

        await screen.findByRole("cell", { name: firstName });
        await actions.openItemOptions({ id });

        expect(screen.queryByRole("menuitem", { name: /remove/i })).not.toBeInTheDocument();
      });
    });

    describe("updateFeature disabled", () => {
      mockConsoleWarn();

      it("wouldn't have an option to remove an item from the list", async () => {
        const { data } = await renderComponent({ updateFeature: false });
        const {
          item: { id, firstName },
        } = getRandomItem<MockInstance>(data);

        await screen.findByRole("cell", { name: firstName });
        await actions.openItemOptions({ id });

        expect(screen.queryByRole("menuitem", { name: /edit/i })).not.toBeInTheDocument();
      });

      it("wouldn't have a path to navigate to edit an item", async () => {
        const {
          randomItem: {
            item: { id },
          },
        } = await renderComponent({
          updateFeature: false,
        });

        await actions.forceNavigateToUpdateScreen();

        assertions.expectNotToBeInUpdateScreen({ id });
      });
    });

    describe("deleteFeature and updateFeature disabled", () => {
      it("wouldn't render an options button in the list", async () => {
        const { data } = await renderComponent({ deleteFeature: false, updateFeature: false });
        const {
          item: { id },
        } = getRandomItem<MockInstance>(data);

        assertions.expectNotToHaveMenuOption({ id });
      });
    });

    describe("addFeature disabled", () => {
      mockConsoleWarn();

      it("wouldn't render a button to navigate to the add screen", async () => {
        await renderComponent({ addFeature: false });

        expect(screen.queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
      });

      it("wouldn't have a path to navigate to the add screen", async () => {
        await renderComponent({
          addFeature: false,
        });

        await actions.forceNavigateToAddScreen();

        assertions.expectNotToBeInAddScreen();
      });
    });

    describe("detailsFeature disabled", () => {
      mockConsoleWarn();

      it("wouldn't navigate to the details screen if I click a row item", async () => {
        const {
          randomItem: {
            item: { id, firstName },
          },
        } = await renderComponent({ detailsFeature: false });

        await userEvent.click(await screen.findByRole("cell", { name: firstName }));

        assertions.expectNotToBeInDetailsScreen({ id });
      });

      it("wouldn't have a path to navigate to the details screen", async () => {
        const {
          randomItem: {
            item: { id },
          },
        } = await renderComponent({ detailsFeature: false });

        await actions.forceNavigateToDetailsScreen();

        assertions.expectNotToBeInDetailsScreen({ id });
      });
    });
  });
});
