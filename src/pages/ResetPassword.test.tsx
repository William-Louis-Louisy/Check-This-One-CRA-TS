import React from "react";
import "@testing-library/jest-dom";
import axios from "axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppContext } from "../contexts/AppContext";
import ResetPassword from "./ResetPassword";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ token: "fixture-reset-token" }),
}));

const renderForm = () =>
  render(
    <AppContext.Provider value={{ lang: "fr", darkMode: false } as any}>
      <ResetPassword />
    </AppContext.Provider>
  );

const submit = (password: string, confirmation: string = password) => {
  fireEvent.change(screen.getByLabelText("Mot de passe"), {
    target: { value: password },
  });
  fireEvent.change(screen.getByLabelText("Confirmez votre mot de passe"), {
    target: { value: confirmation },
  });
  fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
};

beforeEach(() => {
  jest.clearAllMocks();
  (axios.post as jest.Mock).mockResolvedValue({
    data: { message: "Password reset successful" },
  });
});

describe("ResetPassword validation", () => {
  it.each(["Exemple123!", "Exemple123@", "Exemple123-"])(
    "submits a valid password with special character: %s",
    async (password) => {
      renderForm();
      submit(password);
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          expect.stringMatching(/\/reset-password\/confirm$/),
          { token: "fixture-reset-token", password }
        );
      });
      expect(await screen.findByText("Mot de passe réinitialisé !")).toBeInTheDocument();
    }
  );

  it.each([
    ["Exemple123", "missing special character"],
    ["exemple123!", "missing uppercase letter"],
    ["Exempleabc!", "missing number"],
    ["Ex1!", "too short"],
    ["Exemple123 ", "contains whitespace"],
  ])("rejects %s (%s) before an HTTP request", (password) => {
    renderForm();
    submit(password);
    expect(axios.post).not.toHaveBeenCalled();
    expect(screen.getByText(/une majuscule, un chiffre et un caractère spécial/)).toBeInTheDocument();
  });

  it("rejects a mismatched confirmation", () => {
    renderForm();
    submit("Exemple123!", "Autre123!");
    expect(axios.post).not.toHaveBeenCalled();
    expect(screen.getByText("Vos mots de passe ne correspondent pas.")).toBeInTheDocument();
  });
});
