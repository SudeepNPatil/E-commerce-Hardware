import { BsArrowRightCircleFill } from 'react-icons/bs';
import Headphone from '../assets/Headphone.png';
import USB from '../assets/USB.png';

export default function () {
  return (
    <div className="flex flex-col w-full px-10 mt-40 ">
      <div className="flex flex-row justify-between  px-10 bg-red-500 bg-opacity-75 w-full h-[450px] rounded-3xl rounded-tr-full">
        <div className="flex flex-col justify-center gap-3 ml-10">
          <p className="text-white font-semibold">NEWSLETTER</p>

          <h1 className="text-white text-5xl w-96 font-bold">
            Subscribe our newsletter.
          </h1>

          <div className="rounded-full w-[480px] h-20 border flex flex-col justify-center items-center mt-2 relative">
            <input
              type="text"
              className="outline-none pl-6 pr-10 rounded-full self-center w-full h-full"
              placeholder="Enter your email address "
            />
            <BsArrowRightCircleFill className="text-5xl absolute right-4 cursor-pointer" />
          </div>
        </div>

        <div className="relative w-[420px]">
          <img
            src={Headphone}
            alt="headphone"
            className="w-full h-full absolute -top-32 right-16"
          />
          <div className="bg-yellow-300 rounded-full w-16 h-16 absolute bottom-20"></div>
          <div className="bg-blue-300 rounded-full w-10 h-10 absolute bottom-20 right-0"></div>
        </div>
      </div>
    </div>
  );
}
