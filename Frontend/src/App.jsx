import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Catogary from './Components/Catogary';
import Footer from './Components/Footer';
import Whatwedo from './Components/Whatwedo';
import Subscribe from './Components/Subscribe';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Catogary />
      <Whatwedo />
      <Subscribe />
      <Footer />
    </>
  );
}

export default App;
