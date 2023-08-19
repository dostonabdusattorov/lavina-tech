import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { BookItem } from "./Book";

interface BookData {
  id: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages: number;
}

export interface Book {
  book: BookData;
  status: number;
}

interface Props {
  books: Book[];
}

export const Books: FC<Props> = ({ books }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "start",
          gap: 1,
          padding: 10,
        }}
      >
        {books &&
          books?.map((book) => <BookItem key={book.book.id} book={book} />)}
        {!books && (
          <Typography alignItems={"center"} variant="h6" noWrap>
            There is no book
          </Typography>
        )}
      </Box>
    </Box>
  );
};
