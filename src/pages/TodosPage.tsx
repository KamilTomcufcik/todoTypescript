import TodoList from '../components/TodoList';
import NewTodo from '../components/NewTodo';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import SideBar from '../layout/SideBar';
import { TodoContext } from '../context/todos-context';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ListContext } from '../context/todo-list-context';
import React from 'react';

const TodosPage = () => {
  const { addTodo, todos } = useContext(TodoContext);
  const { categories } = useContext(ListContext);

  const params = useParams();

  const temp = !!categories.find((category) => category.name === params.name);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          margin: 2,
        }}
      >
        <Toolbar />
        {temp && (
          <React.Fragment>
            <NewTodo onAddTodo={addTodo} />
            <TodoList items={todos} />
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default TodosPage;
