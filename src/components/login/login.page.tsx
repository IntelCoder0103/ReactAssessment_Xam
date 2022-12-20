import { Box } from '@mui/material';
import * as React from 'react';
import LoginForm from './login.form';

export interface ILoginPageProps {
}

export default function LoginPage (props: ILoginPageProps) {
  return (
    <Box width={"30rem"} m={"2rem auto"}>
      <LoginForm />
    </Box>
  );
}
