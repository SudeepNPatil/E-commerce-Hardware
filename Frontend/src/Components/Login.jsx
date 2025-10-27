import { IoPersonAddOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';
import ModalMediam from '../modals/ModalMediam.jsx';
import ModalLoading from '../modals/ModalLoading';
import { MdError } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { MdBlockFlipped } from 'react-icons/md';
import { TbLockOpen } from 'react-icons/tb';
import { useLogincontext } from '../Context/LoginContext.jsx';

export default function Login() {
  const { logindata, setlogininfo } = useLogincontext();

  const [userinfo, setuserinfo] = useState({
    Email: '',
    password: '',
  });
  const [ismodalopen, setmodalopen] = useState(false);
  const [info, setinfo] = useState({
    logo: '',
    message: '',
    moreinfo: '',
    path: '',
    content: '',
  });
  const [loadingmodal, setloadingmodal] = useState(false);
  const handlechange = (e) => {
    const { value, name } = e.target;
    setuserinfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    if (!userinfo.Email || !userinfo.password) {
      setmodalopen(true);
      return setinfo({
        logo: (
          <MdBlockFlipped className="text-6xl font-extrabold mb-5 text-red-500 text-opacity-70 self-center p-2 rounded-lg bg-red-100" />
        ),
        message: 'Please Enter Credentials ❗',
        moreinfo: 'Please use valid credentials to login',
        path: 'login',
        content: 'Try again',
      });
    }
    setloadingmodal(true);
    try {
      const res = await fetch('http://localhost:5000/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userinfo),
      });

      const data = await res.json();

      console.log(data);
      setlogininfo(data);
      localStorage.setItem('token', data.token);

      setmodalopen(true);
      setloadingmodal(false);

      if (res.status == 200) {
        setinfo({
          logo: (
            <TbLockOpen className="text-6xl font-extrabold mb-5 text-green-500 self-center p-2 rounded-lg bg-green-100" />
          ),
          message: 'Login successfully✅',
          moreinfo: 'You unlocked some features',
          path: 'Home',
          content: 'Go to Dashbord',
        });
      } else if (res.status == 400) {
        setinfo({
          logo: (
            <RxCross1 className="text-6xl font-extrabold mb-5 text-red-500 self-center p-2 rounded-lg bg-red-100" />
          ),
          message: 'Invalid Emil or Password ⛔',
          moreinfo: 'Please enter valid email and password',
          path: 'login',
          content: 'Try again',
        });
      } else if (res.status == 404) {
        setinfo({
          logo: (
            <MdBlockFlipped className="text-6xl font-extrabold mb-5 text-red-500 text-opacity-70 self-center p-2 rounded-lg bg-red-100" />
          ),
          message: 'User not found ❗',
          moreinfo: 'Please sign up and continue login',
          path: 'signup',
          content: 'Go to Signup',
        });
      } else {
        setinfo({
          logo: (
            <MdError className="text-6xl font-extrabold mb-5 text-red-500 self-center p-2 rounded-lg bg-red-100" />
          ),
          message: 'Server Error ❌',
          moreinfo:
            'There is server error please wait 2 to 3 minutes and try again',
          path: 'login',
          content: 'Try again',
        });
      }
    } catch (err) {
      console.log('Cant reach to a server', err);

      setloadingmodal(false);
      setmodalopen(true);
      setinfo({
        logo: (
          <MdError className="text-6xl font-extrabold mb-5 text-red-500 self-center p-2 rounded-lg bg-red-100" />
        ),
        message: "Can't reach the server ❗",
        moreinfo: 'Please check the network connetion',
        path: 'login',
        content: 'Try again',
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="block">
        <div className="flex flex-col sm:flex-row rounded-lg bg-white xl:max-w-[1000px] lg:w-[85vw] sm:w-[100vw] shadow-lg relative">
          <div className="xl:w-[33%] sm:w-[38%] hidden sm:block rounded-l-lg bg-red-50  h-[580px]">
            <div className="flex py-10 lg:px-7 md:px-6 sm:ml-2 sm:mt-6 md:mt-0 items-center gap-2 ">
              <img src={logo} alt="logo" className="w-14 rounded-full " />
              <h1 className="text-xl font-semibold tracking-wider">
                Hardware Shop
              </h1>
            </div>

            <div className="flex flex-col hover:bg-[#ca414110] hover:rounded-3xl cursor-pointer py-1">
              <div className="flex flex-wrap gap-2 p-2 items-center">
                <button className="border-2 w-7 h-7 lg:ml-10 md:ml-6 sm:ml-2  rounded-full border-blue-400">
                  ✓
                </button>
                <h1 className="text-lg font-semibold tracking-wide">Signin</h1>
              </div>
              <p className="text-gray-700 lg:ml-[76px] md:ml-[60px] sm:ml-[40px] mt-1 text-base lg:pr-10 sm:pr-3">
                Signin to Hardware Shop to unlock all the features
              </p>
            </div>

            <Link
              to={`/Signup`}
              className="flex flex-col  hover:bg-[#ca414110] hover:bg-opacity-40 hover:rounded-3xl cursor-pointer mt-8 py-1"
            >
              <div className="flex flex-wrap gap-2 p-2 items-center">
                <button className="border-2 w-7 h-7 lg:ml-10 md:ml-6 sm:ml-2 rounded-full border-blue-400">
                  ✓
                </button>
                <h1 className="text-lg font-semibold tracking-wide">Signup</h1>
              </div>
              <p className="text-gray-700 lg:ml-[76px] md:ml-[60px] sm:ml-[40px] text-base lg:pr-10 sm:pr-3">
                signup to Hardware Shop to get our membership of the our
                community
              </p>
            </Link>
          </div>

          <div className="xl:w-[67%] sm:w-[58%] w-[70%] mt-20  sm:my-0  xl:px-40 lg:px-20 md:px-16 sm:px-14 mx-auto">
            <IoPersonAddOutline size={30} className="mx-auto mt-24" />

            <h1 className="tracking-wider font-semibold text-xl text-center mt-2">
              Signin
            </h1>

            <p className="text-sm text-gray-700 text-center mt-2">
              Please Enter the valid details below
            </p>

            <form className="flex flex-col gap-1 flex-wrap">
              <label htmlFor="name" className="mt-8 font-semibold">
                Email
              </label>
              <input
                type="text"
                id="name"
                name="Email"
                value={userinfo.Email}
                onChange={handlechange}
                className="pl-3 rounded-md  h-10 border outline-none"
                placeholder="Enter Email"
              />

              <label htmlFor="password" className="mt-4 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handlechange}
                value={userinfo.password}
                className="pl-3 rounded-md  h-10 border outline-none"
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={handlelogin}
                className="h-10 mt-6 hover:bg-red-500 border-red-500 border  rounded-md"
              >
                Signin
              </button>

              <p className="text-black text-center mt-6">
                Can't Signin?{' '}
                <Link to={`/Signup`} className="text-red-600 cursor-pointer">
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>

        <ModalMediam isOpen={ismodalopen} onClose={() => setmodalopen(false)}>
          <div className="flex flex-col justify-center p-5">
            {info.logo}
            <h1 className="text-2xl text-center font-semibold">
              {info.message}
            </h1>
            <p className="text-gray-700 text-base text-center mt-2">
              {info.moreinfo}
            </p>
            <Link
              to={`/${info.path}`}
              onClick={() => setmodalopen(false)}
              className="px-10 py-2 rounded-lg mt-8 bg-black bg-opacity-80 text-white text-center mx-auto"
            >
              {info.content}
            </Link>
          </div>
        </ModalMediam>

        <ModalLoading isOpen={loadingmodal}></ModalLoading>
      </div>
    </div>
  );
}
