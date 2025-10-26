import React from 'react';
import { LuLockKeyhole } from 'react-icons/lu';
import { useState, useRef, useEffect } from 'react';

export default function SignupCom2({
  handlechange,
  userinfo,
  handlesubmit,
  validate,
  setvalidate,
}) {
  const [indicate, setindicate] = useState('');
  const [confirm, setconfirm] = useState('');
  const hasrendered = useRef(false);
  const getpassword = (e) => {
    let value = e.target.value;
    setconfirm(value);
  };

  useEffect(() => {
    if (userinfo.password.length > 0 && userinfo.password == confirm) {
      setindicate('Password matched');
      setvalidate('');
      hasrendered.current = true;
    }
    if (userinfo.password != confirm && hasrendered.current) {
      setindicate('Password missmatch');
    }
  }, [confirm]);

  return (
    <div className="xl:w-96 lg:w-[62%] md:w-[60%] sm:w-[60%] w-[100vw] mx-auto pt-16 pb-28 xl:px-0 lg:px-20 md:px-14 sm:px-12 px-12 sm:mt-0 mt-20">
      <LuLockKeyhole
        size={30}
        className="mt-16 mx-auto border rounded-md px-1 py-1"
      />
      <h1 className="font-bold text-2xl text-center opacity-85 mt-4">
        Choose a password
      </h1>

      <p className="text-sm text-gray-700 text-center mt-2">
        Must be at least 8 characters
      </p>

      <form className="flex flex-col gap-1">
        <label htmlFor="name" className="mt-8 font-semibold">
          Password
        </label>
        <input
          type="text"
          id="name"
          name="password"
          placeholder="enter password"
          value={userinfo.password}
          onChange={handlechange}
          className="pl-3 rounded-md h-10 border"
        />

        <label htmlFor="conform" className="mt-4 font-semibold">
          Confirm password
        </label>
        <input
          type="password"
          id="conform"
          name="conform"
          onChange={getpassword}
          placeholder="Conform password"
          className="pl-3 rounded-md h-10 border"
        />

        {indicate && (
          <p
            className={`${
              userinfo.password == confirm ? 'text-green-500' : 'text-red-500'
            } text-[10px] my-1`}
          >
            {indicate}
          </p>
        )}

        {validate && <p className="text-red-500 text-sm my-2">{validate}</p>}

        <button
          onClick={(e) => {
            e.preventDefault();

            handlesubmit();
          }}
          className="h-10 mt-6 bg-red-500 hover:bg-red-600 rounded-md font-semibold"
        >
          Complete signup
        </button>
      </form>
    </div>
  );
}
