import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import R from "../../constants/R";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth.context";
import { useNavigate } from 'react-router';

export interface ILoginFormProps {
}

export default function LoginForm(props: ILoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>();
  const [error, setError] = useState<string>();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    try {
      await login(data);
      setError('');
      navigate("/");
    } catch (e) {
      if (typeof (e) == "string") {
        setError(e as string);
      }
    }
  };

  return (
    <Paper elevation={2}>
      <Box padding="2rem">
        <Typography variant="h4">{R.login.heading}</Typography>
        <form className="p-3" onSubmit={handleSubmit(handleLogin)}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              label={R.login.labels.branchId}
              fullWidth
              margin="normal"
              {...register("branchId", { required: true })}
            />
            <TextField
              label={R.login.labels.userName}
              fullWidth
              margin="normal"
              inputProps={{ ...register("userName", { required: true }) }}
            />
            <TextField
              name="password"
              label={R.login.labels.password}
              fullWidth
              margin="normal"
              type="password"
              inputProps={{ ...register("password") }}
            />
            <Button variant="contained" fullWidth type="submit">
              {R.login.loginBtn}
            </Button>
            {errors.branchId && (
              <Alert severity="error">
                {R.login.labels.branchId} is required
              </Alert>
            )}
            {errors.userName && (
              <Alert severity="error">
                {R.login.labels.userName} is required
              </Alert>
            )}
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </Paper>
  );
}
