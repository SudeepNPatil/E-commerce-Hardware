import nana from '../assets/try.png';
import earbuds from '../assets/earbuds.png';
import Mouse from '../assets/Mouse.png';
import RajeshKumar from '../assets/RajeshKumar.png';
import AmitSharma from '../assets/AmitSharma.png';
import PriyaPatel from '../assets/PriyaPatel.png';
import { Link } from 'react-router-dom';

export default function Whatwedo() {
  return (
    <>
      <div className="flex flex-row justify-between mt-32 pl-20 pr-4 mb-48 gap-14">
        <div className="bg-yellow-500 relative h-[620px] w-[560px] rounded-3xl rounded-bl-[80px] rounded-tr-[420px] flex flex-col justify-end items-center">
          <img src={nana} alt="person" className="object-cover h-[500px]" />
          <img
            src={earbuds}
            alt="earbuds"
            className="absolute top-10 right-24 w-28"
          />
        </div>

        <div className="flex-1  relative">
          <p className="text-red-500 font-semibold tracking-widest mt-10 text-lg">
            BUY HARDWARE WITH US
          </p>

          <h1 className="text-5xl text-black font-bold mt-3 leading-snug">
            Why purchase computer Hardware with us ?
          </h1>

          <p className="text-gray-700 text-lg mt-1 leading-relaxed font-medium">
            We don’t just deliver computer hardware we make sure it works for
            you. Along with every order, you can book an expert to install or
            fix the hardware right at your home. No more searching for a
            technician after purchase our professionals handle setup and
            troubleshooting with ease. Enjoy a modern, hassle-free platform
            where buying and fixing your gadgets happens in one simple step.
          </p>

          <p className="text-gray-700 text-lg mt-5 leading-relaxed font-medium">
            Our mission is to save your time and give you peace of mind by
            combining hardware sales with expert support.
          </p>

          <Link
            to={`/About`}
            className="py-5 inline-block rounded-full px-10 hover:bg-red-500 border border-red-500 text-xl text-red-500 bg-opacity-80 font-semibold hover:text-white text-center mt-12"
          >
            Learn more
          </Link>

          <img
            src={Mouse}
            alt="mouse"
            className="absolute  -bottom-60 rounded-full right-0 w-96"
          />
        </div>
      </div>
      <div className="bg-red-50 w-full h-[650px] -mt-16">
        <h1 className="text-red-500 tracking-[8px] font-semibold text-center pt-16">
          EXPERT TECHNICIAN
        </h1>
        <h1 className="text-center text-5xl font-bold text-black mt-5">
          Let's meet the expert.
        </h1>
        <div className="flex flex-row justify-around items-center mt-20">
          <div className="rounded-full flex flex-col justify-end items-center border-2 border-white rounded-tr-3xl w-60 h-60 bg-blue-300 shadow-2xl relative">
            <div className="bg-white rounded-full w-20 h-20 absolute bottom-0 z-40 right-0 text-blue-500 text-5xl font-bold flex flex-col justify-center items-center">
              in
            </div>
            <div className="overflow-hidden rounded-full w-56 h-56">
              <img
                src={RajeshKumar}
                alt="expert1"
                className="object-cover h-56"
              />
            </div>
          </div>

          <div className="rounded-full  border-2 border-white rounded-tr-3xl w-60 h-60 bg-yellow-300 shadow-2xl relative flex flex-col justify-end items-center">
            <div className="bg-white rounded-full w-20 h-20 absolute bottom-0 right-0 text-blue-500 text-5xl font-bold flex flex-col justify-center items-center">
              in
            </div>
            <div className="overflow-hidden rounded-full w-56 h-56">
              <img
                src={AmitSharma}
                alt="expert2"
                className="object-cover h-56"
              />
            </div>
          </div>

          <div className="rounded-full  border-2 border-white rounded-tr-3xl w-60 h-60 bg-red-400 shadow-2xl relative flex flex-col justify-end items-center">
            <div className="bg-white rounded-full w-20 h-20 absolute bottom-0 right-0 text-blue-500 text-5xl font-bold flex flex-col justify-center items-center">
              in
            </div>
            <div className="overflow-hidden rounded-full w-56 h-56">
              <img
                src={PriyaPatel}
                alt="expert2"
                className="object-cover h-56"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
