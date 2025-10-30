import { Link } from 'react-router-dom';
import Home from '../assets/Home.png';
import Catogary from './Catogary';
import Subscribe from './Subscribe';
import Whatwedo from './Whatwedo';

export default function () {
  return (
    <>
      <div className="flex flex-row bg-gray-100 bg-opacity-25 justify-between pt-8 px-20">
        <div className="flex flex-col gap-5  w-fit flex-wrap relative mt-36">
          <h1 className="text-black text-7xl font-bold">
            Buy Computer Hardware with us
          </h1>

          <p className="text-gray-700 font-semibold text-lg pr-24">
            Your hardware journey, our helpful hands - discover, shop, and relax
            while we handle the rest!
          </p>

          <div className="flex flex-row justify-start gap-10">
            <Link
              to={`/Products`}
              className="bg-red-500 hover:bg-opacity-30 text-white hover:text-red-700 font-bold py-4 px-7 rounded-full"
            >
              Order Now
            </Link>

            <Link
              to={`/About`}
              className="hover:bg-red-500 bg-red-100 bg-opacity-20 hover:text-white border border-red-500 text-red-700 font-bold py-4 px-7  rounded-full"
            >
              Explore More
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-end h-full relative">
          <div className="bg-red-500 bg-opacity-85 h-[560px] w-[500px] mt-10 rounded-tr-full rounded-tl-full flex flex-col justify-end items-center">
            <img src={Home} alt="Home" className="object-cover h-[500px]" />
          </div>
          <div className="bg-yellow-400 w-12 h-12 rounded-full absolute top-14 -left-16"></div>
          <div className="bg-blue-500 w-8 h-8 rounded-lg absolute top-36 -right-12 rotate-45"></div>
          <div className="bg-red-300 w-10 h-10 rounded absolute bottom-10 -left-36 rotate-45"></div>
        </div>
      </div>

      <Catogary />
      <Whatwedo />

      <Subscribe />
    </>
  );
}
