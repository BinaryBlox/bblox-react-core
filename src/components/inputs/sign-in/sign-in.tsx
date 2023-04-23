import React, { FormEvent, useState } from "react";
import { Stack, Box, TextField, Typography, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export interface SignInProps {
  title: string;
  subtitle: string;
  error?: Error;
  loading?: boolean;
  onSubmitSignIn: (email: string, password: string) => void;
}

export const SignIn = ({ title, subtitle, loading, error, onSubmitSignIn }: SignInProps) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email) {
      setEmailError("Please fill out this field");
    }

    if (!password) {
      setPasswordError("Please fill out this field");
    }

    if (email && password) {
      onSubmitSignIn(email, password);
    }
  }

  return (
    <>
      <Box marginBottom={2}>
        <Typography component="h1" variant="h4">
          {title}
        </Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        {error && (
          <Stack width="100%" marginTop={1}>
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          </Stack>
        )}
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          disabled={loading}
          type="email"
          inputProps={{ role: "input" }}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          margin="normal"
          fullWidth
          role="input"
          name="password"
          label="Password"
          type="password"
          id="password"
          disabled={loading}
          autoComplete="current-password"
          inputProps={{ role: "input" }}
          error={!!passwordError}
          helperText={passwordError}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          disabled={loading}
          role="button"
          sx={{ mt: 2 }}
        >
          Sign In
        </LoadingButton>
      </Box>
    </>
  );
};
