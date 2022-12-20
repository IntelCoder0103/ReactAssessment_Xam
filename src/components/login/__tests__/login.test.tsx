import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useNavigate } from "react-router";
import R from "../../../constants/R";
import AuthContext, { AuthContextProvider } from "../../../contexts/auth.context";
import LoginPage from "../login.page";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: ()=>mockNavigate,
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
  it("should show errors when password is incorrect", async () => { 
    const { container } = render(<AuthContextProvider><LoginPage /></AuthContextProvider>);
    const branchId = container.querySelector("input[name=branchId]");
    const userName = container.querySelector("input[name=userName]");
    const password = container.querySelector("input[name=password]");
    const loginBtn = container.querySelector("button[type=submit]");
    await act(()=>{
      fireEvent.change(branchId!, { target: { value: 10001 } });
      fireEvent.change(userName!, { target: { value: 'testuser01' } });
      fireEvent.change(password!, { target: { value: 'abcd' } });

      fireEvent.click(loginBtn!);
    })
    expect(screen.getByText(R.login.errors.password)).toBeInTheDocument();
  });
  it("should save user state when successfully logged in, redirect to home", async () => {
    const { container } = render(<AuthContextProvider>
      <LoginPage />
      <AuthContext.Consumer>
        {value => <div>{ value?.user?.userName}</div>}
      </AuthContext.Consumer>
    </AuthContextProvider>);
    const branchId = container.querySelector("input[name=branchId]");
    const userName = container.querySelector("input[name=userName]");
    const password = container.querySelector("input[name=password]");
    const loginBtn = container.querySelector("button[type=submit]");
    jest.spyOn(window.localStorage, "setItem");
    
    await act(() => {
      fireEvent.change(branchId!, { target: { value: 10001 } });
      fireEvent.change(userName!, { target: { value: 'testuser01' } });
      fireEvent.change(password!, { target: { value: "pa55w0rd001" } });

      fireEvent.click(loginBtn!);
    });
    expect(screen.getByText("testuser01")).toBeInTheDocument();
    expect(mockNavigate).toBeCalledWith("/");
  })
});
