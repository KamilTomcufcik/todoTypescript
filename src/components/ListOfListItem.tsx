import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from '@mui/material';

const MyListItemButton = styled(ListItemButton)({
  // backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: 'white',
  },
});

const MyListItem = styled(ListItem)({
  padding: 0,
});

const ListOfListItem: React.FC<{
  id: string;
  name: string;
  onClick: (id: string, name: string) => void;
}> = (props) => {
  const changeActiveList = () => {
    props.onClick(props.id, props.name);
  };
  return (
    <MyListItem>
      <MyListItemButton
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        onClick={changeActiveList}
      >
        <ListItemText
          primary={props.name}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      </MyListItemButton>
    </MyListItem>
  );
};

export default ListOfListItem;
