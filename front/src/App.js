import React, { useState } from "react";
import { Stack } from "@fluentui/react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Todo Item 1" },
    { id: 2, name: "Todo Item 2" },
  ]);

  const addTodo = (todoName) => {
    if (todoName !== "") {
      const newId = todos.length + 1;
      const newTodos = [...todos, { id: newId, name: todoName }];
      setTodos(newTodos);
    }
  };

  const deleteTodo = (id) => {
    const newTasks = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTasks);
  };

  return (
    <PageLayout>
      <div className="wrapper">
        <AuthenticatedTemplate>
          <Stack horizontalAlign="center">
            <h1>Todo App using Fluent UI &amp; React</h1>
            <Stack style={{ width: 300 }} gap={25}>
              <AddTodo addTodo={addTodo} />
              <TodoList todos={todos} deleteTodo={deleteTodo} />
            </Stack>
          </Stack>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          You need to be authenticated to acces your todo list.
        </UnauthenticatedTemplate>
      </div>
    </PageLayout>
  );
}

export default App;
