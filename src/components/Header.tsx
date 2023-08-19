import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
}

export const Header: FC<Props> = ({ name }) => {
  const navigate = useNavigate();

  const handleSignOut = (): void => {
    localStorage.removeItem("key");
    localStorage.removeItem("secret");

    navigate("/signup");
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="h6"
            color="inherit"
            noWrap
          >
            <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <Person sx={{ mr: 2 }} />
              {name ? name : ""}
            </div>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={() => navigate("/create-book")}
              variant="contained"
              color="success"
            >
              Create Book
            </Button>
            <Button onClick={handleSignOut} variant="contained" color="error">
              Sign out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
