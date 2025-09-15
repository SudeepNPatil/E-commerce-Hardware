import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import SignupCom1 from './SignupCom1';
import SignupCom2 from './SignupCom2';
import { useState } from 'react';
import logo from '../assets/logo.png';

export default function Signup() {
  const [nextStep, setNextStep] = useState(false);
  const [warnig, setwarning] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center 2xl:h-screen">
        <div className="mx-auto flex flex-row rounded-lg bg-white lg:w-[80vw] sm:w-[100vw] shadow-2xl relative">
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

          {nextStep ? <SignupCom2 /> : <SignupCom1 setNextStep={setNextStep} />}
        </div>
      </div>
    </div>
  );
}
