import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Products from './Components/Products.jsx';
import Home from './Components/Home.jsx';
import Contact from './Components/Contact.jsx';
import Login from './Components/Login.jsx';

const myrouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Home',
        element: <Home />,
      },
      {
        path: '/Contact',
        element: <Contact />,
      },
      {
        path: '/Products',
        element: <Products />,
      },
    ],
  },
  {
    path: '/Login',
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={myrouter} />
);
