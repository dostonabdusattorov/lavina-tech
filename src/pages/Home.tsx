import { useNavigate } from "react-router-dom";
import { useGetAllBooksQuery, useGetUserQuery } from "../store";
import { useEffect } from "react";
import { Books, Header } from "../components";
import { Box, CircularProgress, Typography } from "@mui/material";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("key")) {
      navigate("/signup");
    }
    // @ts-ignore
  }, []);
  const { data: userData } = useGetUserQuery("");
  const { data: books, isLoading: isBooksLoading } = useGetAllBooksQuery("");

  return (
    <main>
      <Header name={userData?.data?.name}></Header>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {isBooksLoading ? (
          <CircularProgress
            sx={{
              marginTop: 15,
            }}
          />
        ) : books?.data && books?.data.length > 0 ? (
          <Books books={books?.data} />
        ) : (
          <Typography
            sx={{ marginTop: 20 }}
            alignItems={"center"}
            variant="h6"
            noWrap
          >
            There is no book
          </Typography>
        )}
      </Box>
    </main>
  );
}
