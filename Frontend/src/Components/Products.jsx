import { useEffect, useState } from 'react';
import { RiHeartAdd2Line } from 'react-icons/ri';

export default function () {
  const [data, setdata] = useState([]);
  const [keepall, setkeepall] = useState([]);
  useEffect(() => {
    fetch('https://supamart-v-backend.onrender.com/products')
      .then((data) => data.json())
      .then((data) => (setdata(data), setkeepall(data)));
  }, []);

  const handlefilter = (value) => {
    const filtereddata = keepall.filter((info) => info?.price < value);

    setdata(filtereddata);
  };

  const handlefilter2 = (value) => {
    const filtered = keepall.filter((info) => info?.price > value);
    setdata(filtered);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-red-500 bg-opacity-80 w-full h-52 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl font-bold text-white">
          Computer hardware Products
        </h1>
      </div>
      <div className="flex flex-row gap-10 mt-10 justify-center">
        <button
          onClick={() => handlefilter(1000)}
          className="py-2 px-6 border rounded-full text-center w-auto focus:bg-red-500"
        >
          Less than 1000
        </button>
        <button
          onClick={() => handlefilter(2000)}
          className="py-2 px-6 border rounded-full text-center w-auto focus:bg-red-500"
        >
          Less than 2000
        </button>
        <button
          onClick={() => handlefilter(5000)}
          className="py-2 px-6 border rounded-full text-center w-auto focus:bg-red-500"
        >
          Less than 5000
        </button>
        <button
          onClick={() => handlefilter(10000)}
          className="py-2 px-6 border rounded-full text-center w-auto focus:bg-red-500"
        >
          Less than 10000
        </button>
        <button
          onClick={() => handlefilter2(10000)}
          className="py-2 px-6 border rounded-full text-center w-auto focus:bg-red-500"
        >
          More than 10000
        </button>
      </div>

      <div className="flex flex-row justify-center my-20 flex-wrap px-20 gap-16">
        {data?.map((data, index) => (
          <div
            key={index}
            className="flex flex-col shadow-xl rounded-xl w-52 hover:scale-110 duration-500 ease-in-out cursor-pointer border"
          >
            <div className="w-full h-48 flex justify-center items-center px-5 py-5 relative">
              <img
                src={data?.image}
                alt={data?._id}
                className="object-contain w-full h-full"
              />
              <RiHeartAdd2Line className="absolute top-1 right-1 text-4xl p-2 hover:bg-gray-100 rounded-full" />
            </div>
            <div className="px-4 py-4 bg-gray-100 rounded-b-xl">
              <h1 className="truncate text-base font-semibold">
                {data?.title}
              </h1>
              <p className="text-green-700">₹ {data?.price} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
