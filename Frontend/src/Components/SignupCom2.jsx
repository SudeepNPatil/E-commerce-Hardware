import React from 'react';
import { LuLockKeyhole } from 'react-icons/lu';

export default function SignupCom2() {
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
          className="pl-3 rounded-md h-10 border"
        />

        <label htmlFor="confirm" className="mt-4 font-semibold">
          Confirm password
        </label>
        <input
          type="password"
          id="confirm"
          className="pl-3 rounded-md h-10 border"
        />

        <button className="h-10 mt-6 bg-red-500 hover:bg-red-600 rounded-md font-semibold">
          Complete signup
        </button>
      </form>
    </div>
  );
}
