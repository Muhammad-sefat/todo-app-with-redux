import { createSlice } from "@reduxjs/toolkit";

const loadTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState = {
  todos: loadTodos(),
  filter: "all",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = newText;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleTodo: (state, action) => {
      const existingTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
