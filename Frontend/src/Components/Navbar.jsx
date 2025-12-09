import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useLogincontext } from '../Context/LoginContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {
  MdAdminPanelSettings,
  MdOutlineAccountBalance,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { IoBagHandleOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { FiShoppingCart } from 'react-icons/fi';

export default function () {
  const { logindata, setlogininfo } = useLogincontext();
  const islogedin = Object.keys(logindata);
  const [Open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  console.log(logindata);
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

  const handleLogout = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      localStorage.removeItem('token');
      setlogininfo({});
      navigate('/Home');
    }, 2000);
  };

  return (
    <div className="flex flex-row justify-between px-12 items-center py-4 shadow-sm overflow-x-hidden">
      <Link to={`/Home`} className="flex flex-row items-center gap-5">
        <img
          src={logo}
          alt="logo"
          className="rounded-full w-24 hover:scale-110 duration-700 ease-in-out cursor-pointer"
        />
        <h1 className="text-black text-opacity-90 font-bold text-2xl cursor-pointer hover:scale-105 duration-300 ease-in-out">
          Hardware Shop
        </h1>
      </Link>

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
      >
        <div className="flex flex-col justify-start py-12 gap-2">
          <Link
            to={`/AccountInfo`}
            className="flex flex-row gap-5 items-center text-xl pl-10 p-5 hover:bg-blue-100 hover:border-l-4 hover:border-l-blue-500"
          >
            <MdOutlineAccountBalance className="text-3xl" />
            <span className="font-semibold opacity-85">Account info</span>
          </Link>
          <Link
            to={`/Orders`}
            className="flex flex-row gap-5 items-center text-xl pl-10 p-5 hover:bg-blue-100 hover:border-l-4 hover:border-l-blue-500"
          >
            <IoBagHandleOutline className="text-3xl" />
            <span className="font-semibold opacity-85">Orders</span>
          </Link>

          {localStorage.getItem('ProductType') === 'Custom' ? (
            ''
          ) : (
            <>
              <Link
                to={`/Cart`}
                className="flex flex-row gap-5 items-center text-xl  pl-10 p-5 hover:bg-blue-100 hover:border-l-4 hover:border-l-blue-500"
              >
                <FiShoppingCart className="text-3xl" />
                <span className="font-semibold opacity-85">Cart</span>
              </Link>

              <Link
                to={`/Wishlist`}
                className="flex flex-row gap-5 items-center text-xl  pl-10 p-5 hover:bg-blue-100 hover:border-l-4 hover:border-l-blue-500"
              >
                <FaRegHeart className="text-3xl" />
                <span className="font-semibold opacity-85">Wishlists</span>
              </Link>
            </>
          )}

          {logindata?.user?.role === 'admin' ? (
            <Link
              to={`/admin/Dashboard`}
              className="flex flex-row gap-5 items-center text-xl  pl-10 p-5 hover:bg-blue-100 hover:border-l-4 hover:border-l-blue-500"
            >
              <MdOutlineAdminPanelSettings className="text-3xl" />
              <span className="font-semibold opacity-85">Admin</span>
            </Link>
          ) : (
            ''
          )}
          <Link
            onClick={handleLogout}
            className="flex flex-row gap-5 items-center text-xl  pl-10 p-5 hover:bg-red-100 hover:border-l-4 hover:border-l-red-500"
          >
            <MdOutlineLogout className="text-3xl" />
            <span className="font-semibold opacity-85">Logout</span>
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform animate-slideUp">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle
                  className="text-white"
                  size={48}
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Successfully Logged Out!
              </h3>
              <p className="text-gray-600">
                You have been safely logged out of your account.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
