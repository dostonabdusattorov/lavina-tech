import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Book } from "./Books";
import { useDeleteBookMutation, useEditBookMutation } from "../../store";

interface Props {
  book: Book;
}

export const BookItem: FC<Props> = ({ book }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [status, setStatus] = useState(book.status);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(+event.target.value);
  };

  const [
    deleteBook,
    {
      isLoading: isBookDeleting,
      isSuccess: isBookDeletingSuccess,
      isError: isBookDeletingError,
    },
  ] = useDeleteBookMutation();
  const [
    editBook,
    {
      isLoading: isBookEditing,
      isSuccess: isBookEditingSuccess,
      isError: isBookEditingError,
    },
  ] = useEditBookMutation();

  useEffect(() => {
    setOpenSuccess(isBookDeletingSuccess || isBookEditingSuccess);
    setOpenError(isBookDeletingError || isBookEditingError);
  }, [
    isBookDeletingSuccess,
    isBookDeletingError,
    isBookEditingSuccess,
    isBookEditingError,
  ]);

  const submitEdit = () => {
    editBook({ id: book.book.id, body: { status } });
    setIsEditing(false);
  };
  return (
    <>
      <Snackbar
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        autoHideDuration={3000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {`Book ${isBookDeletingSuccess ? "deleted" : "edited"} successfully`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        onClose={() => setOpenError(false)}
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {`Book ${isBookDeletingError ? "deleting" : "editing"} failed`}
        </Alert>
      </Snackbar>

      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image={book.book.cover}
        />
        <CardContent sx={{ width: 400 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {book.book.title}
          </Typography>
          <Box sx={{ width: 400, display: "flex", gap: 2 }}>
            Author:{" "}
            <Typography sx={{ fontWeight: 700 }}>{book.book.author}</Typography>
          </Box>
          <Box sx={{ width: 400, display: "flex", gap: 2 }}>
            Published:{" "}
            <Typography sx={{ fontWeight: 700 }}>
              {book.book.published}
            </Typography>
          </Box>
          <Box sx={{ width: 400, display: "flex", gap: 2 }}>
            Pages:{" "}
            <Typography sx={{ fontWeight: 700 }}>{book.book.pages}</Typography>
          </Box>
          <Box sx={{ width: 400, display: "flex", gap: 2 }}>
            Status:{" "}
            <Typography sx={{ fontWeight: 700 }}>
              {book.status === 0
                ? "New"
                : book.status === 1
                ? "Reading"
                : "Finished"}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", gap: 1 }}>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="contained"
              color="success"
              size="small"
            >
              Edit
            </Button>
          )}
          {isEditing && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Select
                labelId={`${status}`}
                id="demo-simple-select"
                value={`${status}`}
                label={`${status}`}
                onChange={handleChange}
              >
                <MenuItem value={0}>New</MenuItem>
                <MenuItem value={1}>Reading</MenuItem>
                <MenuItem value={3}>Finished</MenuItem>
              </Select>
              <Button
                onClick={submitEdit}
                variant="contained"
                color="success"
                size="small"
                disabled={isBookEditing}
              >
                {isBookEditing ? <CircularProgress /> : "Submit"}
              </Button>
            </Box>
          )}
          <Button
            onClick={() => {
              deleteBook(book.book.id);
            }}
            disabled={isBookDeleting}
            variant="contained"
            color="error"
            size="small"
          >
            {isBookDeleting ? <CircularProgress /> : "Delete"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
