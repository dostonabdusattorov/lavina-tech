import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LockOutlined } from "@mui/icons-material";
import { useSignUpMutation } from "../store";
import { useNavigate } from "react-router-dom";
import { forwardRef, useEffect } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SignUp() {
  const navigate = useNavigate();
  const [signup, { isLoading, isSuccess, data, isError, error }] =
    useSignUpMutation();

  useEffect(() => {
    if (localStorage.getItem("key")) {
      navigate("/");
    }

    if (isSuccess) {
      localStorage.setItem("key", data.data.key);
      localStorage.setItem("secret", data.data.secret);

      navigate("/");
    }
    // @ts-ignore
  }, [isSuccess]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      data.get("name") === "" ||
      data.get("email") === "" ||
      data.get("secret") === "" ||
      data.get("key") === ""
    ) {
      return;
    }

    signup({
      name: data.get("name"),
      email: data.get("email"),
      key: data.get("key"),
      secret: data.get("secret"),
    });
  };

  const Error = () => {
    // @ts-ignore
    return <Alert severity="error">{error?.data?.message}</Alert>;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="secret"
                label="Secret"
                type="password"
                id="secret"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="key"
                label="key"
                type="password"
                id="key"
                autoComplete="key"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : "Register"}
          </Button>
        </Box>
      </Box>
      {isError && <Error />}
    </Container>
  );
}
