import { configureStore } from "@reduxjs/toolkit";
import reducerTodo from "./todoSlice";

export const store = configureStore({
  reducer: {
    todos: reducerTodo,
  },
});
