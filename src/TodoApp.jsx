import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "./redux/todoSlice";

const TodoApp = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState("");

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold my-6">Redux Todo App</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 w-full text-black rounded"
          placeholder="Add a todo..."
        />
        <button
          className="bg-green-500 px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      <ul className="w-1/2">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-800 p-2 rounded mb-2"
          >
            {editId === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="text-black p-1 rounded"
              />
            ) : (
              <span>
                {index + 1}) {todo.text}
              </span>
            )}

            <div className="flex space-x-2">
              {editId === todo.id ? (
                <button
                  className="bg-blue-500 px-3 py-1 rounded"
                  onClick={handleUpdateTodo}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 px-3 py-1 rounded"
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
