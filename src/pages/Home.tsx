import { useNavigate } from "react-router-dom";
import {
  useGetAllBooksQuery,
  useGetSearchBooksQuery,
  useGetUserQuery,
} from "../store";
import { useEffect, useState } from "react";
import { Books, Header } from "../components";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { DebounceInput } from "react-debounce-input";

export function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    data: books,
    isLoading: isBooksLoading,
    isSuccess: isBooksSuccess,
  } = useGetAllBooksQuery("");

  const [renderedBooks, setRenderedBooks] = useState({
    isSearched: false,
    books: [],
  });
  const {
    data: searchedBooks,
    isLoading: isSearchBooksLoading,
    isSuccess: isSearchBooksSuccess,
  } = useGetSearchBooksQuery(search.trim(), {
    skip: search.length === 0,
  });

  useEffect(() => {
    if (search.trim() && isSearchBooksSuccess) {
      setRenderedBooks({ isSearched: true, books: searchedBooks?.data });
    } else if (isBooksSuccess) {
      setRenderedBooks({ isSearched: false, books: books?.data });
    }
  }, [search, isSearchBooksSuccess, isBooksSuccess, books, searchedBooks]);

  useEffect(() => {
    if (!localStorage.getItem("key")) {
      navigate("/signup");
    }
    // @ts-ignore
  }, []);
  const { data: userData } = useGetUserQuery("");

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
        <div style={{ marginTop: 50 }}>
          <DebounceInput
            debounceTimeout={700}
            onChange={(event) => setSearch(event.target.value)}
            element={TextField}
          />
        </div>
        {isBooksLoading || isSearchBooksLoading ? (
          <CircularProgress
            sx={{
              marginTop: 15,
            }}
          />
        ) : renderedBooks.books.length > 0 ? (
          <Books
            isSearched={renderedBooks.isSearched}
            books={renderedBooks.books}
          />
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
