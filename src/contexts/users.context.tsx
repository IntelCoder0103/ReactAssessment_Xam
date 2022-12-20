import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import R from "../constants/R";
import { Navigate } from "react-router-dom";
import { users as initialUsers} from "../data/users_data";
interface IUsersContext {
  users: IUser[];
  addUser: (newUser: IUser) => void;
  removeUser: (user: IUser) => void;
}

const UsersContext = createContext<IUsersContext>({} as IUsersContext);

export const UsersContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [users, setUsers] = useState<IUser[]>(initialUsers);

  const addUser = (newUser: IUser) => {
    setUsers([
      ...users,
      newUser
    ]);
  }
  const removeUser = (user: IUser) => {
    const index = users.findIndex(u => u.branchId == user.branchId);
    if(index >= 0)
    {
      users.splice(index,1);
      setUsers([...users]);
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        removeUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
