import { render, screen } from "@testing-library/react";
import React from "react";
import R from "../../../constants/R";
import LoginPage from "../login.page";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("Login form", () => {
  it("should have branch id, username and password input field", async () => {
    const { container } = render(<LoginPage />);

    expect(container.querySelector("input[name=branchId]")).toBeInTheDocument();
    expect(container.querySelector("input[name=userName]")).toBeInTheDocument();
    expect(container.querySelector("input[name=password]")).toBeInTheDocument();
    expect(container.querySelector("button[type=submit]")).toBeInTheDocument();
  });

  it("should display proper labels for input field", async () => {
    const { container } = render(<LoginPage />);

    expect(
      screen.getByRole("textbox", { name: R.login.labels.branchId })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: R.login.labels.userName })
    ).toBeInTheDocument();

    expect(screen.getAllByText(R.login.labels.branchId).length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText(R.login.labels.userName).length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText(R.login.labels.password).length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText(R.login.loginBtn).length).toBeGreaterThan(0)
  });
  it("should", async () => { });
  
});
