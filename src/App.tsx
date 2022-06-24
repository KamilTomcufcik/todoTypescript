import { Route, Routes } from 'react-router-dom';
import TodosPage from './pages/TodosPage';

export default function App() {
  return (
    <Routes>
      <Route path='*' element={<TodosPage />} />
      <Route path='/todos/:name' element={<TodosPage />} />
    </Routes>
  );
}
