import * as React from "react";
import LayoutDefault from "../common/layout/layout.default";
import { withAuth } from "../../contexts/auth.context";
import UsersAddForm from "./users.add";
import { Box } from "@mui/material";
import UsersTable from "./users.table";
export interface IUsersPageProps {}

function UsersPage(props: IUsersPageProps) {
  return (
    <LayoutDefault>
      <Box
        display="flex"
        gap="2rem"
        flexWrap="wrap"
        p={3}
      >
        <Box width={"24rem"} maxWidth={"95vw"}>
          <UsersAddForm />
        </Box>
        <Box flexGrow={1} height={600}>
          <UsersTable />
        </Box>
      </Box>
    </LayoutDefault>
  );
}

export default withAuth(UsersPage);
