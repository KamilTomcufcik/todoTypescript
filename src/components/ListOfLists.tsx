import { List } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/todos-context';
import ListOfListItem from './ListOfListItem';

const ListOfLists: React.FC<{ items: { id: string; name: string }[] }> = (
  props
) => {
  const navigate = useNavigate();

  const { getTodos } = useContext(TodoContext);

  const onClickHandler = (id: string, name: string) => {
    navigate(`/todos/${name}`);
    getTodos(id);
  };

  return (
    <List
      sx={{
        width: '100%',
        backgroundColor: 'transparent',
        marginTop: 2,
        paddingTop: 0,
      }}
    >
      {props.items.map((item) => (
        <ListOfListItem
          key={item.id}
          id={item.id}
          name={item.name}
          onClick={onClickHandler}
        />
      ))}
    </List>
  );
};

export default ListOfLists;
