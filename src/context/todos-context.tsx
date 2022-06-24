import React, { useState } from 'react';
import Todo from '../models/Todo';

type TodoContextObject = {
  todos: Todo[];
  addTodo: (name: string, text: string, listId: string) => void;
  getTodos: (id: string) => void;
  removeTodo: (id: string, listId: string) => void;
};

export const TodoContext = React.createContext<TodoContextObject>({
  todos: [],
  addTodo: (name: string, text: string, listId: string) => {},
  getTodos: (id: string) => {},
  removeTodo: (id: string, listID: string) => {},
});

const TodoContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const httpRequest = async (todo: Todo, listId: string) => {
    const url = `https://62a31de321232ff9b218d5c8.mockapi.io/lists/${listId}/todo`;

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(JSON.stringify(todo));
    const data = res.json();
    console.log(data);
  };

  const addTodoHandler = (name: string, text: string, listId: string) => {
    setTodos((prevTodos) => {
      const id = prevTodos.length + 1;
      const newTodo = new Todo(id.toString(), text, name, true);
      httpRequest(newTodo, listId);
      return prevTodos.concat(newTodo);
    });
  };

  const getTodosHandler = async (listId: string) => {
    const url = `https://62a31de321232ff9b218d5c8.mockapi.io/lists/${listId}/todo`;
    const response = await fetch(url);

    const data = await response.json();
    console.log(data);

    if (data) {
      const finalData: Todo[] = [];
      for (const key in data) {
        finalData.push({
          id: data[key].id,
          name: data[key].name,
          text: data[key].text,
          active: data[key].active,
        });
      }
      setTodos(finalData);
    }
  };

  const deleteHttp = async (id: string, listId: string) => {
    const url = `https://62a31de321232ff9b218d5c8.mockapi.io/lists/${listId}/todo/${id}`;

    const res = await fetch(url, {
      method: 'DELETE',
    });

    if (!res.ok) {
      alert('Nepodarilo sa odstranit todo.');
    }
  };

  const removeTodoHandler = async (idToRemove: string, listId: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== idToRemove);
      deleteHttp(idToRemove, listId);
      return newTodos;
    });
  };

  const contextValue: TodoContextObject = {
    todos: todos,
    addTodo: addTodoHandler,
    getTodos: getTodosHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
