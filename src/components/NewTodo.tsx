import { Button, Input } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { ListContext } from '../context/todo-list-context';

const MyInput = styled(Input)({
  width: '100%',
  height: 48,
  backgroundColor: 'white',
  paddingLeft: 8,
  '::placeholder': {
    color: 'red',
  },
});

const MyButton = styled(Button)({
  width: 'fit-content',
  color: 'black',
  fontWeight: 600,
  ':hover': {
    backgroundColor: 'transparent',
  },
});

const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#dedede',
  padding: '1em',
  borderRadius: 5,
});

const WrapperButtons = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  marginTop: 16,
  // marginBottom: 8,
  justifyContent: 'space-between',
});

const NewTodo: React.FC<{
  onAddTodo: (name: string, text: string, listId: string) => void;
}> = (props) => {
  const [poznamka, setPoznamka] = useState<boolean>(false);

  const { categories } = useContext(ListContext);
  const params = useParams();

  const location = useLocation();

  const onPoznamkaHandler = () => {
    setPoznamka((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    setPoznamka(false);
  }, [location]);

  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(30, '30 písmen alebo menej'),
    }),
    onSubmit: (values, actions) => {
      const listId = categories.find(
        (category) => category.name === params.name
      )!.id;
      props.onAddTodo(values.name, values.text, listId);
      actions.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Wrapper>
        <MyInput
          id='name'
          name='name'
          type='text'
          placeholder='Pridať úlohu'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <WrapperButtons>
          <Button
            sx={{ color: 'black', ':hover': { backgroundColor: '#c7c5c5' } }}
            onClick={onPoznamkaHandler}
          >
            Pridať poznámku
          </Button>
          <MyButton type='submit' disabled={!formik.values.name}>
            Pridať
          </MyButton>
        </WrapperButtons>
        {poznamka && (
          <MyInput
            sx={{ marginTop: 2 }}
            id='text'
            name='text'
            type='text'
            placeholder='Poznámka'
            onChange={formik.handleChange}
            value={formik.values.text}
          />
        )}

        {formik.touched.name && formik.errors.name && (
          <div>{formik.errors.name}</div>
        )}
      </Wrapper>
    </form>
  );
};

export default NewTodo;
