import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import Todo from '../models/Todo';

const MyListItem = styled(ListItem)({
  backgroundColor: '#dedede',
});

const Name = styled('h2')({});

const MyButton = styled(ListItemButton)({
  backgroundColor: '#b5b5b5',
  borderRadius: 8,
  maxWidth: 100,
  height: 'fit-content',
  ':hover': {
    backgroundColor: '#c7c5c5',
  },
});

const TodoItem: React.FC<{
  item: Todo;
  onRemove: (id: string) => void;
}> = (props) => {
  const removeTodo = () => {
    props.onRemove(props.item.id);
  };
  return (
    <MyListItem
      key={props.item.id}
      sx={{
        borderTop: 1,
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Name sx={{ marginTop: 1, marginBottom: 2 }}>{props.item.name}</Name>
        <MyButton onClick={removeTodo}>
          <Typography>Odstrániť</Typography>
        </MyButton>
      </Box>

      {props.item.text && (
        <ListItemText
          sx={{ marginTop: 0, marginBottom: 1 }}
          primary={props.item.text}
        />
      )}
    </MyListItem>
  );
};

export default TodoItem;
