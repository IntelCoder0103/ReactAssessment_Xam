import { Box, Button } from "@mui/material";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import R from "../../constants/R";
import UsersContext from "../../contexts/users.context";
export interface IUsersTableProps {}

export default function UsersTable(props: IUsersTableProps) {
  const { users, removeUser } = React.useContext(UsersContext);
  const usersWithId = users.map((u, i) => ({ ...u, id: i + 1 }));

  const handleRemove = (user: IUser) => {
    removeUser(user);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 30 },
    { field: "branchId", headerName: R.users.labels.branchId, width: 130 },
    { field: "userName", headerName: R.users.labels.userName, width: 130 },
    {
      field: "name",
      headerName: R.users.labels.name,
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName} ${params.row.middleName} ${params.row.lastName}`,
    },
    { field: "position", headerName: R.users.labels.position, width: 130 },
    {
      field: "action",
      headerName: R.users.labels.action,
      renderCell: (params) => {
        return (
          <Button size="small" variant="contained" onClick={() => handleRemove(params.row as IUser)}>
            {R.users.actions.remove}
          </Button>
        );
      },
    },
  ];
  return <DataGrid rows={usersWithId} columns={columns}/>;
}
