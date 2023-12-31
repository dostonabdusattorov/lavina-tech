import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useCreateBookMutation, useGetUserQuery } from "../store";
import { Header } from "../components";
import { unstable_usePrompt, useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading, isSuccess, isError, error }] =
    useCreateBookMutation();
  const { data: userData } = useGetUserQuery("");
  const [isbn, setIsbn] = useState("");

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    // @ts-ignore
  }, [isSuccess]);

  unstable_usePrompt({
    when: isbn.length !== 0,
    message: "There is a change. Should we continue?",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isbn === "") {
      return;
    }

    createBook({
      isbn,
    });

    setIsbn("");
  };

  const Error = () => {
    // @ts-ignore
    return <Alert severity="error">{`${error?.data?.message}`}</Alert>;
  };

  return (
    <div>
      <Header name={userData?.data?.name}></Header>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create book
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="isbn"
            required
            type="number"
            minRows={13}
            fullWidth
            id="isbn"
            label="International Standard Book Number"
            autoFocus
            onChange={(event) => setIsbn(event.target.value)}
          />
          <Button
            disabled={isLoading || isbn.length === 0}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <CircularProgress /> : "Create"}
          </Button>
        </Box>
        {isError && <Error />}
      </Box>
    </div>
  );
};
