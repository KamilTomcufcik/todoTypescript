import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ListContextProvider from './context/todo-list-context';
import TodoContextProvider from './context/todos-context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ListContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </ListContextProvider>
  </BrowserRouter>
);
