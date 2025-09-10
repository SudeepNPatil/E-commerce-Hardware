import { IoIosArrowForward } from 'react-icons/io';
import Computer_Hardware from '../assets/Computer_Hardware.jpg';
import Accessories from '../assets/Accessories.png';
import Electronic_devices from '../assets/Electronic_devices.png';

export default function () {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-red-600 text-opacity-75 tracking-[10px] font-semibold text-xl text-center">
        FEATURES
      </h1>

      <h1 className="text-5xl text-black text-center mt-3 font-bold text-opacity-95 w-[700px] leading-tight">
        Get a many of intresting Products
      </h1>

      <div className="flex flex-row mt-14 justify-around overflow-x-auto py-10 w-full">
        <div className="bg-gradient-to-b from-gray-100 to-white w-80 h-52 rounded-t-3xl relative mt-14">
          <div className="absolute -top-[85px] left-1/2 -translate-x-1/2 w-36 h-36 bg-white shadow-2xl rounded-full flex flex-col items-center justify-center">
            <img
              src={Computer_Hardware}
              alt="ComputerHardware"
              className="object-contain rounded-full"
            />
          </div>
          <h1 className="text-center text-2xl font-bold text-black mt-20">
            Computer Hardware
          </h1>
          <p className="text-gray-700 px-10 font-semibold text-center mt-2">
            Core parts that make up a computer system
          </p>
          <a
            href="#"
            className="hover:underline hover:underline-offset-4  text-red-600  text-xl block mt-2 text-center font-semibold"
          >
            Lear More <IoIosArrowForward className="text-xl inline-block" />
          </a>
        </div>

        <div className="bg-gradient-to-b from-gray-100 to-white w-80 h-52 rounded-t-3xl relative mt-14">
          <div className="absolute -top-[85px] left-1/2 -translate-x-1/2 w-36 h-36 bg-white shadow-2xl rounded-full flex flex-col items-center justify-center">
            <img
              src={Electronic_devices}
              alt="ComputerHardware"
              className="object-contain rounded-full"
            />
          </div>
          <h1 className="text-center text-2xl font-bold text-black mt-20">
            Electronic Devices
          </h1>
          <p className="text-gray-700 px-10 font-semibold text-center mt-2">
            General consumer electronics, not limited to computers
          </p>
          <a
            href="#"
            className="hover:underline hover:underline-offset-4  text-red-600  text-xl block mt-2 text-center font-semibold"
          >
            Lear More <IoIosArrowForward className="text-xl inline-block" />
          </a>
        </div>

        <div className="bg-gradient-to-b from-gray-100 to-white w-80 h-52 rounded-t-3xl relative mt-14">
          <div className="absolute -top-[85px] left-1/2 -translate-x-1/2 w-36 h-36 bg-white shadow-2xl rounded-full flex flex-col items-center justify-center">
            <img
              src={Accessories}
              alt="ComputerHardware"
              className="object-contain rounded-full"
            />
          </div>
          <h1 className="text-center text-2xl font-bold text-black  mt-20">
            Accessories
          </h1>
          <p className="text-gray-700 px-10 font-semibold text-center mt-2">
            Supporting or add-on products for computers and electronics
          </p>
          <a
            href="#"
            className="hover:underline hover:underline-offset-4  text-red-600  text-xl block mt-2 text-center font-semibold"
          >
            Lear More <IoIosArrowForward className="text-xl inline-block" />
          </a>
        </div>
      </div>
    </div>
  );
}
