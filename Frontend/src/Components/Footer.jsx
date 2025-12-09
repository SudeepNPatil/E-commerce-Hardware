import logo from '../assets/logo.png';
import { TiSocialFacebook } from 'react-icons/ti';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

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

          <p className="text-gray-600 w-[350px] font-semibold mt-2 ml-3">
            Open an account in minutes, get full financial control for much
            longer.
          </p>

          <div className="flex flex-row gap-10 mt-8">
            <a href="https://facebook.com">
              <TiSocialFacebook className="text-4xl p-2 shadow-3xl rounded-full bg-white" />
            </a>
            <a href="https://www.instagram.com/">
              <IoLogoInstagram className="text-4xl p-2 shadow-3xl rounded-full bg-white" />
            </a>
            <a href="https://x.com">
              <FaXTwitter className="text-4xl p-2 shadow-3xl rounded-full bg-white" />
            </a>
          </div>
        </div>

        <div className="flex flex-row justify-end px-10 gap-32  w-full">
          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-bold pt-2">Company</h1>
            <ul className="flex flex-col text-gray-700  text-lg gap-2.5 mt-8">
              <Link to={`/Home`}>Home</Link>
              <Link to={`Products`}>Products</Link>
              <Link to={`/Cantact`}>Contact </Link>
              <Link to={`/About`}> About us</Link>
            </ul>
          </div>

          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-bold pt-2">information</h1>
            <ul className="flex flex-col text-gray-700  text-lg gap-2.5 mt-8">
              <Link to={`/About`}>Support</Link>
              <Link to={`/About`}>About us</Link>
              <Link to={`/Home`}>How we work </Link>
              <Link to={`/About`}> Know About us</Link>
            </ul>
          </div>
        </div>
      </div>

      <hr className="h-0.5 bg-black  mx-20 mt-14 opacity-40" />

      <div className="flex flex-row justify-between px-20 pt-10">
        <p className="text-gray-800">
          @2025 - Computer Hardware developed by Codementor team
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
