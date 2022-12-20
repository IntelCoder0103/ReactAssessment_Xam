import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppTheme from "./themes";
import AppRoutes from "./App.routes";
import { BrowserRouter } from "react-router-dom";
import AuthContext, { AuthContextProvider } from "./contexts/auth.context";
import { UsersContextProvider } from "./contexts/users.context";

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <AuthContextProvider>
        <UsersContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UsersContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
