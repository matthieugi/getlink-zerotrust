import React, { useState, useEffect } from "react";
import { Stack } from "@fluentui/react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { PageLayout } from "./components/PageLayout";
import { PrimaryButton } from "@fluentui/react";
import { loginRequest } from "./components/authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import "./App.css";

function TodoComponent() {
  const { instance, accounts, inProgress } = useMsal();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const name = accounts[0] && accounts[0].name;
  const itemsURI = `${process.env.REACT_APP_BACKEND_URI}items`;

  async function fetchData( accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };
    
    fetch(itemsURI, options)
      .then((response) =>
        response.json().then((json) => {
          console.log(json);
          setData(json);
          setIsLoading(false);
        })
      )
      .catch((error) => console.log(error));
  }


  const fetchItems = async () => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        fetchData(response.accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          fetchData(response.accessToken);
        });
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addTodo = (todoName) => {
    if (todoName !== "") {
      const newId = data.length + 1;
      const newTodos = [...data, { id: newId, name: todoName }];
      console.log(newTodos)
      setData(newTodos);
    }
  };

  const deleteTodo = (id) => {
    const newTasks = data.filter((todo) => {
      return todo.id !== id;
    });
    setData(newTasks);
  };


  return (isLoading ? <p>loading</p> :           <Stack horizontalAlign="center">
  <Stack style={{ width: 300 }} gap={25}>
    <AddTodo addTodo={addTodo} />
    <TodoList todos={data} deleteTodo={deleteTodo} />
  </Stack></Stack>
)
}


function App() {
  const [todos, setTodos] = useState([]);

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
            
            <TodoComponent />
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
