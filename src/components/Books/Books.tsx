import { Box } from "@mui/material";
import { FC } from "react";
import { BookItem } from "./Book";

interface BookData {
  id?: number;
  isbn?: string;
  title?: string;
  cover?: string;
  author?: string;
  published?: number;
  pages?: number;
}

export interface Book {
  book: BookData;
  status: number;
}

interface Props {
  isSearched: boolean;
  books: Book[];
}

export const Books: FC<Props> = ({ books, isSearched }) => {
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
          books?.map((book) => (
            <BookItem
              isSearched={isSearched}
              key={book?.book?.id}
              book={book}
            />
          ))}
      </Box>
    </Box>
  );
};
