import React from 'react';
import { MdOutlineOutlinedFlag } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';

export default function Signupcom1({
  setNextStep,
  userinfo,
  handlechange,
  validate,
  setvalidate,
}) {
  return (
    <div className="xl:w-96 lg:w-[62%] md:w-[60%] sm:w-[60%] w-[100vw] mx-auto pb-10 xl:px-0 lg:px-20 md:px-14 sm:px-12 px-12 sm:mt-0 mt-20">
      <MdOutlineOutlinedFlag
        size={40}
        className="mt-16 mx-auto border rounded-md px-1 py-1"
      />
      <h1 className="font-bold text-2xl text-center opacity-85 mt-4">
        Your details
      </h1>

      <p className="text-sm text-gray-700 text-center mt-2 w-full">
        Please provide your valid name and email.
      </p>

      <button className="h-10 border rounded-md mt-5 w-full text-center font-semibold">
        <FcGoogle size={20} className="inline-block mr-2" />
        Signup with Google
      </button>

      <div className="flex flex-row gap-2 justify-center items-center w-full mt-5">
        <hr className="bg-black/40 h-0.5 w-full" />
        <p>OR</p>
        <hr className="bg-black/40 h-0.5 w-full" />
      </div>

      <form className="flex flex-col gap-1">
        <label htmlFor="name" className="mt-4 font-semibold">
          First name
        </label>
        <input
          type="text"
          id="name"
          name="firstname"
          placeholder="Enter firstname"
          value={userinfo.firstname}
          className="pl-3 rounded-md h-10 border"
          onChange={handlechange}
        />

        <label htmlFor="name" className="mt-4 font-semibold">
          Last name
        </label>
        <input
          type="text"
          id="name"
          name="lastname"
          placeholder="Enter lastname"
          value={userinfo.lastname}
          onChange={handlechange}
          className="pl-3 rounded-md h-10 border"
        />

        <label htmlFor="Email" className="mt-4 font-semibold">
          Email
        </label>
        <input
          type="Email"
          id="Email"
          name="Email"
          placeholder="Enter email"
          value={userinfo.Email}
          className="pl-3 rounded-md h-10 border"
          onChange={handlechange}
        />

        {validate && <p className="text-red-500 text-sm my-2">{validate}</p>}

        <button
          onClick={(e) => {
            e.preventDefault();
            if (!userinfo.Email || !userinfo.firstname || !userinfo.lastname) {
              setvalidate('⚠️Please enter all the details');
            } else {
              setNextStep(true);
              setvalidate('');
            }
          }}
          className={`h-10 mt-6 bg-red-500 hover:bg-red-600 rounded-md`}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
