import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { useLogincontext } from './Context/LoginContext';
import { useLocation } from 'react-router-dom';

function App() {
  const { loading } = useLogincontext();
  const location = useLocation();

  const hideFooterRoutes = ['/AccountInfo'];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-full min-h-screen">
        <div className="border-8 border-b-red-500 border-l-red-500 border-r-red-500 w-16 h-16 rounded-full animate-spin "></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;
