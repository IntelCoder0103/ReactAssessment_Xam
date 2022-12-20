import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import R from '../../../constants/R';
import AuthContext from '../../../contexts/auth.context';

export interface IAppbarDefaultProps {
}

export default function AppbarDefault(props: IAppbarDefaultProps) {
  const { user, logout } = React.useContext(AuthContext);
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>
          {
            user?.userName
          }
          </Typography>
        <Button
          onClick={logout}
          variant="contained"
        >{R.appbar.logoutBtn}</Button>
      </Toolbar>
    </AppBar>
  );
}
