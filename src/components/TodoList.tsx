import Todo from '../models/Todo';
import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { List } from '@mui/material';
import { TodoContext } from '../context/todos-context';
import { ListContext } from '../context/todo-list-context';
import { useParams } from 'react-router-dom';

const TodoList: React.FC<{ items: Todo[] }> = (props) => {
  const { removeTodo } = useContext(TodoContext);
  const { categories } = useContext(ListContext);
  const params = useParams();

  const onRemoveHandler = (id: string) => {
    removeTodo(
      id,
      categories.find((category) => category.name === params.name)!.id
    );
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 1 }}>
      {props.items.map((item) => (
        <TodoItem key={item.id} item={item} onRemove={onRemoveHandler} />
      ))}
    </List>
  );
};

export default TodoList;
