import React from "react";
import axios from "axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../contexts/UserContext";
import ListEdition from "./ListEdition";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ listId: "10" }),
  useNavigate: () => jest.fn(),
}));
jest.mock("../components/Cards/SmallContentCard", () => () => null);
jest.mock("../components/Modals/DeleteConfirmation", () => () => null);
jest.mock("../components/Common/PageLoader", () => () => null);
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

beforeEach(() => {
  jest.clearAllMocks();
  (axios.put as jest.Mock).mockResolvedValue({ data: {} });
});

describe.each([
  ["public", "private"],
  ["private", "public"],
])("ListEdition toggling visibility from %s", (initialPrivacy, expectedPrivacy) => {
  it("submits the edited title and description without losing them", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        list: {
          id: 10,
          title: "Titre initial",
          description: "Description initiale",
          privacy: initialPrivacy,
          content: [],
        },
      },
    });

    render(
      <AppContext.Provider value={{ lang: "fr", darkMode: false } as any}>
        <UserContext.Provider value={{ user: { id: 10 } } as any}>
          <ListEdition />
        </UserContext.Provider>
      </AppContext.Provider>
    );

    const title = await screen.findByDisplayValue("Titre initial");
    const description = screen.getByDisplayValue("Description initiale");

    fireEvent.change(title, { target: { value: "Titre modifié" } });
    fireEvent.change(description, { target: { value: "Description modifiée" } });
    fireEvent.click(screen.getByRole("switch"));
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/list/update/10"),
        {
          title: "Titre modifié",
          description: "Description modifiée",
          privacy: expectedPrivacy,
        }
      );
    });
  });
});
