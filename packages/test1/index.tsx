import React, { useState, useEffect, useCallback } from "react";
import api from "./api";
import { addHours } from "./utils";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deadline: Date;
  start?: boolean;
  timeLeft?: string;
}

const todoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(async () => {
    const savedTodos = await api.get("/todos");
    setTodos(savedTodos);
  }, []);

  const handleAddTodo = () => {
    const updatedTodos = todos.push({ text: newTodo, deadline: addHours(new Date(), 6) });
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = useCallback((id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }, []);

  const countDownTimer = () => {
    const startedTodos = todos.map((todo) => {
      if (!todo.start) {
        return;
      }
      const difference = todo.deadline.getTime() - new Date().getTime();
      let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      } else {
        todo.completed = true;
      }

      todo.timeLeft = timeLeft
    });
    setTodos(startedTodos)
  };

  const start = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, start: true } : todo,
    );
    setTodos(updatedTodos);
  };

  useEffect(() => {
    setTimeout(() => {
      countDownTimer();
    }, 1000);
  }, []);

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
      <ul>
        {todos.map({ ...todo, timeLeft }, (index) => (
          <li>
            <span
              key={index}
              style={{
                "text-decoration": todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={start(todo.id)}>Start</button>
            <button onClick={handleRemoveTodo(todo.id)}>Remove</button>
            <div>{timeLeft}</div>
          </li>
        ))}
      </ul>
      <div>Completed tasks: {completedCount}</div>
    </div>
  );
};

export default todoList;
