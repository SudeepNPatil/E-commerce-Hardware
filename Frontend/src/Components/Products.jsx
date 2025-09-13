import { useEffect, useState } from 'react';

export default function () {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch('https://supamart-v-backend.onrender.com/products')
      .then((data) => data.json())
      .then((data) => setdata(data));
  }, [data]);

  return (
    <div className="flex flex-col">
      <div className="bg-red-500 bg-opacity-80 w-full h-52 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl font-bold text-white">
          Computer hardware Products
        </h1>
      </div>
      <div className="flex flex-row gap-10 mt-10 justify-center">
        <button className="py-4 px-4 border rounded-full">less than 800</button>
        <button className="py-4 px-4 border rounded-full">less than 200</button>
        <button className="py-4 px-4 border rounded-full">less than 600</button>
        <button className="py-4 px-4 border rounded-full">less than 100</button>
        <button className="py-4 px-4 border rounded-full">more than 800</button>
      </div>

      <div className="flex flex-row justify-center mt-20 flex-wrap px-20 gap-16">
        {data?.map((data, index) => (
          <div key={index} className="flex flex-col shadow-xl rounded-3xl w-52">
            <div className="w-full h-48 flex justify-center items-center px-5 py-5">
              <img
                src={data?.image}
                alt={data?._id}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="px-2 py-2">
              <h1 className="truncate text-lg font-semibold ">{data?.title}</h1>
              <p>₹ {data?.price} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
