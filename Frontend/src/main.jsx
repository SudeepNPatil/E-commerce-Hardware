import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Products from './Components/Products.jsx';
import Home from './Components/Home.jsx';
import Contact from './Components/Contact.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import { LoginContextProvider } from './Context/LoginContext.jsx';
import AccountInfo from './Components/AccountInfo.jsx';
import AboutPage from './Components/About.jsx';

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
      {
        path: '/About',
        element: <AboutPage />,
      },
      {
        path: '/AccountInfo',
        element: <AccountInfo />,
      },
    ],
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')).render(
  <LoginContextProvider>
    <RouterProvider router={myrouter} />
  </LoginContextProvider>
);
