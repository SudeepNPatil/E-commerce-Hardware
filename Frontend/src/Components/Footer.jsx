import logo from '../assets/logo.png';
import { TiSocialFacebook } from 'react-icons/ti';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';

export default function () {
  return (
    <div className="bg-gray-50 w-full pt-14 pb-10 mt-10">
      <div className="flex flex-row px-20">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={logo}
              alt="logo"
              className="object-cover w-fit h-16 rounded-full"
            />
            <h1 className="text-black font-bold text-3xl">Hardware shop</h1>
          </div>

          <p className="text-gray-600 w-[350px] font-semibold">
            Open an account in minutes, get full financial control for much
            longer.
          </p>

          <div className="flex flex-row gap-10 mt-8">
            <TiSocialFacebook className="text-4xl p-2 shadow-3xl rounded-full bg-white" />

            <IoLogoInstagram className="text-4xl p-2 shadow-3xl rounded-full bg-white" />

            <FaXTwitter className="text-4xl p-2 shadow-3xl rounded-full bg-white" />
          </div>
        </div>

        <div className="flex flex-row justify-end px-10 gap-32  w-full">
          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-bold pt-2">Company</h1>
            <ul className="flex flex-col text-gray-700  text-lg gap-2.5 mt-8">
              <li>Home</li>
              <li>Products</li>
              <li>list </li>
              <li>some more</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-bold pt-2">information</h1>
            <ul className="flex flex-col text-gray-700  text-lg gap-2.5 mt-8">
              <li>Help/FAQ</li>
              <li>About us</li>
              <li>Blog </li>
              <li>How we work</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="h-0.5 bg-black  mx-20 mt-14 opacity-40" />

      <div className="flex flex-row justify-between px-20 pt-10">
        <p className="text-gray-800">
          @2025 - Chef's kitchen. Distributed By ThemeWagon and Developed by
          GetNextjsTemplates
        </p>
        <div className="text-gray-800 flex flex-row gap-5">
          <p>Privacy policy</p>
          <p className="text-gray-500">|</p>
          <p>Terms & conditions</p>
        </div>
      </div>
    </div>
  );
}
