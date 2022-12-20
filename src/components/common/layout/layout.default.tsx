import { Box, Container } from "@mui/material";
import * as React from "react";
import AppbarDefault from "../appbar/appbar.default";

export interface ILayoutDefaultProps extends React.PropsWithChildren {
}

export default function LayoutDefault(props: ILayoutDefaultProps) {
  const { children } = props;
  return (
    <Box>
      <AppbarDefault />
      <Container sx={{padding: "2rem 0"}}>{children}</Container>
    </Box>
  );
}
