import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  toggleTodo,
} from "./redux/todoSlice";

const TodoApp = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState("");
  const [time, setTime] = useState(new Date());

  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleUpdateTodo = () => {
    if (editId && newText.trim()) {
      dispatch(updateTodo({ id: editId, newText }));
      setEditId(null);
      setNewText("");
    }
  };

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format Date & Time
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* Clock & Date */}
      <div className="flex flex-col items-center justify-center mb-6 w-full">
        <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-3xl md:text-4xl font-bold px-6 py-3 rounded-xl shadow-lg tracking-wider animate-pulse">
          {formattedTime}
        </div>
        <p className="mt-2 text-base md:text-lg font-medium text-gray-300 bg-gray-800 px-4 py-2 rounded-lg shadow-md">
          {formattedDate}
        </p>
      </div>

      {/* Heading & Filter Dropdown */}
      <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-3/4 gap-4 md:gap-6 my-6">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Redux Todo App
        </h1>
        <select
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => dispatch(setFilter(e.target.value))}
          value={filter}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Input & Add Button */}
      <div className="flex flex-col md:flex-row w-full md:w-3/4 space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 w-full text-black rounded"
          placeholder="Add a todo..."
        />
        <button
          className="bg-green-500 px-4 py-2 rounded w-full md:w-auto"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="w-full md:w-3/4">
        {filteredTodos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-2 rounded mb-2"
          >
            {/* Editable Text */}
            {editId === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="p-1 text-black rounded w-full md:w-2/3 mb-2 md:mb-0"
              />
            ) : (
              <span
                className={
                  todo.completed ? "line-through text-gray-400" : "text-lg"
                }
              >
                {index + 1}. {todo.text}
              </span>
            )}

            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded ${
                  todo.completed ? "bg-green-500" : "bg-yellow-500"
                }`}
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                {todo.completed ? "Completed" : "Pending"}
              </button>
              {editId === todo.id ? (
                <button
                  className="bg-blue-500 px-3 py-1 rounded"
                  onClick={handleUpdateTodo}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 px-3 py-1 rounded"
                  onClick={() => {
                    setEditId(todo.id);
                    setNewText(todo.text);
                  }}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-500 px-3 py-1 rounded"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
