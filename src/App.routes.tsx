import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/login";
import UsersPage from "./components/users/users.page";
import AuthContext from "./contexts/auth.context";
export interface IAppRoutesProps {}

export default function AppRoutes(props: IAppRoutesProps) {
  const { user } = React.useContext(AuthContext);
  
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/login" element={<LoginPage />}  />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
}
