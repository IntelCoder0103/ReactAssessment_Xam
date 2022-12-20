import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import R from "../../constants/R";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import UsersContext from "../../contexts/users.context";

export interface IUsersAddFormProps {}

export default function UsersAddForm(props: IUsersAddFormProps) {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm<IUser>();
  const { addUser } = useContext(UsersContext);
  
  const handleAdd = (newUser: IUser) => {
    addUser(newUser);
    handleReset();
  };

  const handleReset = () => {
    clearErrors();
    reset();
  }
  
  const errorKeys = Object.keys(errors) as (keyof IUser)[];
  return (
    <Paper elevation={2}>
      <Box padding="2rem">
        <form className="p-3" onSubmit={handleSubmit(handleAdd)}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              size="small"
              label={R.users.labels.branchId}
              fullWidth
              margin="normal"
              {...register("branchId", { required: true })}
            />
            <TextField
              size="small"
              label={R.users.labels.userName}
              fullWidth
              margin="normal"
              inputProps={{ ...register("userName", { required: true }) }}
            />
            <TextField
              size="small"
              label={R.users.labels.firstName}
              fullWidth
              margin="normal"
              inputProps={{ ...register("firstName", { required: true }) }}
            />
            <TextField
              size="small"
              label={R.users.labels.middleName}
              fullWidth
              margin="normal"
              inputProps={{ ...register("middleName") }}
            />
            <TextField
              size="small"
              label={R.users.labels.lastName}
              fullWidth
              margin="normal"
              inputProps={{ ...register("lastName", { required: true }) }}
            />
            <TextField
              size="small"
              label={R.users.labels.position}
              fullWidth
              margin="normal"
              inputProps={{ ...register("position", { required: true }) }}
            />
            <TextField
              size="small"
              name="password"
              label={R.users.labels.password}
              fullWidth
              margin="normal"
              type="password"
              inputProps={{
                ...register("password", { required: true, minLength: 6 }),
              }}
            />
            <Box display="flex" justifyContent="end" gap={"1rem"}>
              <Button
                variant="contained"
                color="inherit"
                type="button"
                fullWidth
                onClick={handleReset}
              >
                {R.users.actions.reset}
              </Button>
              <Button variant="contained" type="submit" fullWidth>
                {R.users.actions.add}
              </Button>
            </Box>
            {errorKeys.length > 0 && (
              <Alert severity="error">
                {R.users.labels[errorKeys[0] as keyof IUser]}
                {errors[errorKeys[0]]?.type == "required" && " is required"}
                {errors[errorKeys[0]]?.type == "minLength" &&
                  ` must be longer than 6 letters`}
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </Paper>
  );
}
