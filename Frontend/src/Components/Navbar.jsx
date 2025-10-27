import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useLogincontext } from '../Context/LoginContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function () {
  const { logindata } = useLogincontext();
  const islogedin = Object.keys(logindata);
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = () => {
      setOpen(false);
    };

    if (Open) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [Open]);

  return (
    <>
      <div className="flex flex-row justify-between px-12 items-center py-4 shadow-sm overflow-x-hidden">
        <div className="flex flex-row items-center gap-5">
          <img
            src={logo}
            alt="logo"
            className="rounded-full w-24 hover:scale-110 duration-700 ease-in-out cursor-pointer"
          />
          <h1 className="text-black text-opacity-90 font-bold text-2xl cursor-pointer hover:scale-105 duration-300 ease-in-out">
            Hardware Shop
          </h1>
        </div>

        <div className="flex flex-row gap-16 ml-20 text-lg font-bold text-opacity-60 text-black">
          <Link to={`/Home`}>Home</Link>
          <Link to={`/Products`}>Products</Link>
          <Link to={`/Contact`}>Contact</Link>
          <Link to={`/About`}>About us</Link>
        </div>

        <div className="flex flex-row gap-6">
          {islogedin.length === 0 ? (
            <>
              <Link
                to={'/Login'}
                className="rounded-3xl py-3 text-red-600 text-opacity-75 block font-bold px-7  bg-red-200 hover:bg-red-500 bg-opacity-20 hover:bg-opacity-90 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                to={'/Signup'}
                className="rounded-3xl py-3 hover:text-red-600 hover:text-opacity-75 block font-bold px-7 bg-red-500 bg-opacity-90  hover:bg-opacity-20 text-white"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
              <span className="rounded-full w-16 h-16 bg-red-500 text-white text-center text-3xl pt-3">
                {logindata?.user?.firstname[0] || 'S'}
              </span>

              <BsThreeDotsVertical
                className="text-3xl cursor-pointer"
                onClick={(e) => (e.stopPropagation(), setOpen(true))}
              />
            </div>
          )}
        </div>
        <div
          className={`fixed right-0 top-0 z-50 bg-white w-96 h-dvh transform transition-transform duration-300 ease-in-out ${
            Open ? 'translate-x-0' : 'translate-x-full'
          }`}
        ></div>
      </div>
    </>
  );
}
