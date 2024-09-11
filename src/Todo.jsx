import React, { useState } from "react";
import './Todo.css';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, text) => {
    setEdit(true);
    setEditId(id);
    setEditValue(text);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEdit(false);
    setEditId(null);
    setInputValue("");
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo List</h2>
      <input
        type="text"
        className="todo-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {edit ? (
        <div>
          <input
            type="text"
            className="todo-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className="todo-btn update-btn" onClick={updateTodo}>Update</button>
        </div>
      ) : (
        <button className="todo-btn add-btn" onClick={addTodo}>Add</button>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <button className="todo-btn delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button className="todo-btn edit-btn" onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
