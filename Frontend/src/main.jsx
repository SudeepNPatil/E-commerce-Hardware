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
import { ProductTypeContextProvider } from './Context/ProductTypeContext.jsx';
import { CartContextProvider } from './Context/CartContext.jsx';
import { WishlistContextProvider } from './Context/WishlistContext.jsx';
import { OrderContextProvider } from './Context/OrderContext.jsx';
import ReadymadeProductDetailPage from './Components/ReadymadeProductdetailpage.jsx';
import CartPage from './Components/ReadymadeCartPage.jsx';
import WishlistPage from './Components/ReadymadeWishlistpage.jsx';
import CheckoutFlow from './Components/CheckoutFlow.jsx';
import CheckoutPage from './Components/CustomCheoutaddressPage.jsx';
import {
  CustomOrderContext,
  CustomOrderContextProvider,
} from './Context/CustomOrderContext.jsx';
import Orders from './Components/Orders.jsx';

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
        path: '/Products/:type/:id',
        element: <ReadymadeProductDetailPage />,
      },
      {
        path: '/Checkout',
        element: <CheckoutFlow />,
      },
      {
        path: '/About',
        element: <AboutPage />,
      },
      {
        path: '/AccountInfo',
        element: <AccountInfo />,
      },
      {
        path: '/Orders',
        element: <Orders />,
      },
      {
        path: '/Cart',
        element: <CartPage />,
      },
      {
        path: '/Wishlist',
        element: <WishlistPage />,
      },
      {
        path: '/Cheoutaddress',
        element: <CheckoutPage />,
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
  <CustomOrderContextProvider>
    <OrderContextProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          <ProductTypeContextProvider>
            <LoginContextProvider>
              <RouterProvider router={myrouter} />
            </LoginContextProvider>
          </ProductTypeContextProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </OrderContextProvider>
  </CustomOrderContextProvider>
);
