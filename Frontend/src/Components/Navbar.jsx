import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function () {
  return (
    <div className="flex flex-row justify-between px-16 items-center py-4">
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
        <a href="/Home">Home</a>
        <a href="/Products">Products</a>
        <a href="/Contact">Contact</a>
        <a href="/About">About us</a>
      </div>

      <div className="flex flex-row gap-6">
        <button className="rounded-3xl py-3 text-red-600 text-opacity-75 font-bold px-7  bg-red-200 hover:bg-red-500 bg-opacity-20 hover:bg-opacity-90 hover:text-white">
          Sign in
        </button>
        <button className="rounded-3xl py-3 hover:text-red-600 hover:text-opacity-75 font-bold px-7 bg-red-500 bg-opacity-90  hover:bg-opacity-20 text-white">
          Sign up
        </button>
      </div>
    </div>
  );
}
