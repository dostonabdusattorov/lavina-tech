import { configureStore } from "@reduxjs/toolkit";
import { bookshelfApi } from "./bookshelf";
import { registerApi } from "./register";

export const store = configureStore({
  reducer: {
    [bookshelfApi.reducerPath]: bookshelfApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookshelfApi.middleware,
      registerApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./bookshelf";
