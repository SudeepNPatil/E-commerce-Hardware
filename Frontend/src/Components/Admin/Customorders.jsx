import React, { useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { RiEditBoxFill } from 'react-icons/ri';
import { FaBagShopping } from 'react-icons/fa6';
import { useState } from 'react';

export default function Customorders() {
  let count = 0;
  const [orderlists, setorderlists] = useState([]);

  useEffect(() => {
    fetch('https://student-support-s0xt.onrender.com/orders/allordersinfo')
      .then((data) => data.json())
      .then((data) => setorderlists(data));
  }, []);

  return (
    <div className="flex flex-col flex-1 h-screen overflow-auto">
      <div className="flex felx-row justify-between px-14 border-b py-8">
        <h1 className="text-3xl font-bold ">Orders</h1>
      </div>

      <div className="flex flex-col flex-grow mx-14 my-14 rounded-t-2xl border h-auto ">
        <div className="flex flex-row justify-between items-center w-full  px-8 py-8 border-b">
          <div className="flex flex-row  items-center gap-5 ">
            <FaBagShopping className="text-6xl text-yellow-500 p-3 text-opacity-70 rounded-md bg-yellow-50" />
            <h1 className="text-2xl font-bold">All Orders</h1>
          </div>
          <p className="text-2xl text-black font-bold bg-opacity-75">
            total Orders :{' '}
            <span className="text-yellow-500">{orderlists.length}</span>
          </p>
        </div>
        {orderlists.length > 0 ? (
          <table className="text-center border-collapse">
            <tr className="h-20">
              <th className="border w-20">Sl.No</th>
              <th className="border w-50">User info</th>
              <th className="border w-80">items</th>
              <th className="border w-40">status</th>
              <th className="border w-60">Actions</th>
            </tr>
            {orderlists.map((orders, index) => {
              count++;
              return (
                <tr key={index} className="border h-20">
                  <td className="border">{count}</td>
                  <td className="flex flex-col items-start justify-center px-10 gap-1 py-4">
                    <p className="text-[18px]">{orders.userInfo.name}</p>
                    <p className="text-sm">{orders.userInfo.email}</p>
                  </td>
                  <td className="border">
                    {orders.orders.map((item) => (
                      <>
                        <span className="block text-center">{item.title}</span>
                        <span className="block text-center mb-4">
                          category : {item.category}
                        </span>
                      </>
                    ))}
                  </td>
                  <td className="border ">
                    <span className="px-4 py-1 rounded-lg bg-green-100">
                      pending
                    </span>
                  </td>
                  <td className="border">
                    <FaRegEye className="text-4xl p-2 rounded-lg bg-green-50 text-green-500 text-opacity-70 inline-block mx-1" />
                    <RiEditBoxFill className="text-4xl p-2 rounded-lg bg-blue-50 text-blue-500 text-opacity-70 inline-block mx-1" />
                    <AiFillDelete className="text-4xl p-2 rounded-lg bg-red-50 text-red-500 bg-opacity-90 inline-block mx-1" />
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <div className="flex justify-center items-center h-full text-xl text-gray-700">
            No Orders yet
          </div>
        )}
      </div>
    </div>
  );
}
