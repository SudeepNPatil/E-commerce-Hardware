import Home from '../assets/Home.png';

export default function () {
  return (
    <div className="flex flex-row bg-gray-600 bg-opacity-25 justify-between pt-8">
      <div className="flex flex-col gap-5  w-fit flex-wrap relative left-14 mt-36">
        <h1 className="text-black text-7xl font-bold">
          Buy Computer Hardware with us
        </h1>

        <p className="text-gray-700 font-semibold text-lg pr-24">
          Your hardware journey, our helpful hands - discover, shop, and relax
          while we handle the rest!
        </p>

        <div className="flex flex-row justify-start gap-10">
          <button className="bg-red-500 hover:bg-opacity-30 text-white hover:text-red-700 font-bold py-4 px-7 rounded-full">
            Order Now
          </button>

          <button className="hover:bg-red-500 bg-red-100 bg-opacity-20 hover:text-white border border-red-500 text-red-700 font-bold py-4 px-7  rounded-full">
            Explore More
          </button>
        </div>
      </div>

      <div className="flex-shrink ">
        <img
          src={Home}
          alt="Home"
          className="w-full h-full object-cover [mask-image:linear-gradient(to_right,transparent,black_20%,black_100%)] 
           [mask-repeat:no-repeat] 
           [mask-size:100%_100%]"
        />
      </div>
    </div>
  );
}
