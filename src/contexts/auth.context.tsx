import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import R from "../constants/R";
import { users } from "../data/users_data";
import { Navigate } from "react-router-dom";

interface IAuthContext {
  user: IUser | null;
  login: (credential: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const getUser = () => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user") ?? "");
      return user;
    } catch (e) {}
    return null;
  };

  const [user, setUser] = useState<IUser | null>(() => getUser());

  

  const saveUser = (user: IUser | null) => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  const login = async ({branchId, userName, password}: LoginData) => {
    const u = users.find(u => u.branchId == branchId);
    if (!u) throw R.login.errors.branchId;
    if (u.userName != userName) throw R.login.errors.userName;
    if (u.password != password) throw R.login.errors.password;
    setUser(u);
    saveUser(u);
  };
  const logout = () => {
    setUser(null);
    saveUser(null);
  }
  return <AuthContext.Provider value={{
    user,
    login,
    logout
  }}>{children}</AuthContext.Provider>;
};

export function withAuth<T>(component: React.FC<T>): React.FC<T> {
  return (props:T) => {
    const { user } = useContext(AuthContext);
    if(!user)
      return <Navigate replace to="/login" />;
    return component(props);
  }
}
export default AuthContext;
