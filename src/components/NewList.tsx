import { Input } from '@mui/material';
import { styled } from '@mui/system';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { ListContext } from '../context/todo-list-context';

const MyInput = styled(Input)({
  margin: 16,
  marginTop: 8,
  marginBottom: 8,
  '&&&:before': {
    borderBottom: 0,
  },
  '&&:after': {
    borderBottom: 0,
  },
  '::placeholder': {
    color: '$red',
    opacity: 1,
  },
  // ':hover': { backgroundColor: 'white', borderBottom: 0 },
});

const MyDiv = styled('div')({
  maxWidth: 239,

  ':hover': {
    backgroundColor: 'white',
  },
});

const NewList: React.FC = () => {

  const {addCategory} = useContext(ListContext);


  const formik = useFormik({
    initialValues: {
      category: '',
    },
    onSubmit: (values, actions) => {
      if (values.category.trim().length === 0) {
        values.category = 'Zoznam bez názvu';
      }
      addCategory(values.category);
      actions.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <MyDiv>
        <MyInput
          id='category'
          name='category'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.category}
          placeholder='Nový zoznam'
        />
      </MyDiv>
    </form>
  );
};

export default NewList;
