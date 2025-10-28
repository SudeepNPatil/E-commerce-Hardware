import React from 'react';
import { Link } from 'react-router-dom';
import SignupCom1 from './SignupCom1';
import SignupCom2 from './SignupCom2';
import { useState } from 'react';
import logo from '../assets/logo.png';
import ModalMediam from '../modals/ModalMediam';
import { MdError } from 'react-icons/md';
import { AiOutlineApi } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { TbLockOpen } from 'react-icons/tb';
import ModalLoading from '../modals/ModalLoading';

export default function Signup() {
  const [nextStep, setNextStep] = useState(false);
  const [warnig, setwarning] = useState(false);
  const [validate, setvalidate] = useState('');
  const [ismodalopen, setmodalopen] = useState(false);
  const [loadingmodal, setloadingmodal] = useState(false);
  const [info, setinfo] = useState({
    logo: '',
    message: '',
    moreinfo: '',
    path: '',
    content: '',
  });

  const [userinfo, setuserinfo] = useState({
    firstname: '',
    lastname: '',
    Email: '',
    password: '',
  });

  const handlechange = (e) => {
    const { value, name } = e.target;
    setuserinfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async function () {
    if (
      !userinfo.firstname ||
      !userinfo.lastname ||
      !userinfo.Email ||
      !userinfo.password
    ) {
      return setvalidate('⚠️Please Enter valid info');
    } else {
      setvalidate('');
    }

    setloadingmodal(true);

    try {
      let response = await fetch('http://localhost:5000/User/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userinfo),
      });

      let result = await response.json();
      setloadingmodal(false);
      setmodalopen(true);

      if (response.status == 200) {
        setinfo({
          logo: (
            <TbLockOpen className="text-6xl font-extrabold mb-5 text-green-500 self-center p-2 rounded-lg bg-green-100" />
          ),
          message: 'You Registered successfully✅',
          moreinfo: 'Now go to login page for login',
          path: 'login',
          content: 'Go to login',
        });
      } else if (response.status == 400) {
        setinfo({
          logo: (
            <RxCross1 className="text-6xl font-extrabold mb-5 text-red-500 self-center p-2 rounded-lg bg-red-100" />
          ),
          message: 'You Already Registered  ⛔',
          moreinfo: 'Please enter different email to Registere and try again',
          path: 'Signup',
          content: 'Try again',
        });
      } else if (response.status == 429) {
        setinfo({
          logo: (
            <AiOutlineApi className="text-7xl font-extrabold mb-5 text-red-500 text-opacity-70 self-center p-2 rounded-lg bg-red-100" />
          ),
          message: 'API rate limit ❗',
          moreinfo: 'You reached the limit,Please try after some time',
          path: 'Home',
          content: 'Go to Home',
        });
      } else {
        setinfo({
          logo: (
            <MdError className="text-6xl font-extrabold mb-5 text-red-500 self-center p-2 rounded-lg bg-red-100" />
          ),
          message: 'Server Error ❌',
          moreinfo:
            'There is server error please wait 2 to 3 minutes and try again',
          path: 'Signup',
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
        path: 'signup',
        content: 'Try again',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center 2xl:h-screen">
        <div className="mx-auto flex flex-row rounded-lg bg-white lg:w-[1000px] sm:w-[100vw] shadow-2xl relative">
          <div className="hidden sm:block lg:w-[38%] sm:w-[40%] rounded-l-lg bg-red-100 h-auto">
            <div className="flex py-10 xl:px-10 lg:px-6 md:px-4 sm:px-3 lg:mt-0 md:mt-10 sm:mt-6 items-center gap-2">
              <img src={logo} alt="logo" className="w-14 rounded-full" />
              <h1 className="text-xl font-semibold tracking-wider">
                Hardware Shop
              </h1>
            </div>

            <div
              className={`flex flex-col ${
                nextStep ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <div className="flex flex-wrap gap-2 mt-8 items-center">
                <button className="border-2 px-[7px] py-[1px] xl:ml-10 lg:ml-6 md:ml-4 sm:ml-3  rounded-full border-blue-400">
                  ✓
                </button>
                <h1 className="text-lg font-semibold tracking-wide">
                  Your details
                </h1>
              </div>
              <p className="text-gray-700 xl:ml-[76px] lg:ml-[65px] md:ml-[56px] sm:ml-[47px] mt-1 text-base xl:pr-10 lg:pr-3 sm:pr-2">
                Please provide your valid name and email
              </p>
            </div>

            <div
              className={`flex flex-col  ${
                nextStep ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="flex flex-wrap gap-2 mt-5 items-center">
                <button className="border-2 px-[7px] py-[1px] xl:ml-10 lg:ml-6 md:ml-4 sm:ml-3  rounded-full border-blue-400">
                  ✓
                </button>
                <h1 className="text-lg font-semibold tracking-wide">
                  Choose password
                </h1>
              </div>
              <p className="text-gray-700 xl:ml-[76px] lg:ml-[65px] md:ml-[58px] sm:ml-[47px] mt-1 text-base xl:pr-10 lg:pr-3 sm:pr-2">
                Must be at least 8 characters
              </p>
            </div>
          </div>

          {nextStep ? (
            <SignupCom2
              userinfo={userinfo}
              handlesubmit={handlesubmit}
              handlechange={handlechange}
              setvalidate={setvalidate}
              validate={validate}
            />
          ) : (
            <SignupCom1
              setNextStep={setNextStep}
              handlechange={handlechange}
              userinfo={userinfo}
              setvalidate={setvalidate}
              validate={validate}
            />
          )}
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
