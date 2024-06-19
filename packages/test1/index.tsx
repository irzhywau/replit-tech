import React, { useState, useEffect, useMemo, useCallback } from "react";
import api from "./api";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<string>();

  useEffect(async () => {
    const savedTodos = await api.get("/todos");
    setTodos(savedTodos);
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const updatedTodos = [...todos, { text: newTodo }];
    setTodos(updatedTodos);
    setNewTodo("");
  };

  const handleRemoveTodo = useCallback((id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }, []);

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const completedCount = todos.reduce((count, todo) =>
    todo.completed ? count + 1 : count,
  );

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo()}>Add Todo</button>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <ul>
        {filteredTodos.map(todo, (index) => (
          <li>
            <span
              key={index}
              style={{
                "text-decoration": todo.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>Completed tasks: {completedCount}</div>
    </div>
  );
};

export default todoList;
