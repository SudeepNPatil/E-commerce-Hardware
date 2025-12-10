import React, { useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { RiEditBoxFill } from 'react-icons/ri';
import { FaBagShopping } from 'react-icons/fa6';
import { useState } from 'react';

const baseurl = `${import.meta.env.VITE_API_URL}`;

export default function Readymadeorders() {
  let count = 0;
  const [orderlists, setorderlists] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/readymadeOrders/allorders`)
      .then((data) => data.json())
      .then((data) => setorderlists(data.orders));
  }, []);

  const handledelete = (id) => {
    fetch(`${baseurl}/readymadeOrders/orders/${id}`, {
      method: 'DELETE',
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);

        let updatedorderlist = orderlists.filter((item) => item._id != id);
        setorderlists(updatedorderlist);
      });
  };

  const handlechnage = (id, status) => {
    fetch(`${baseurl}/readymadeOrders/trackorder/${id}/${status}`, {
      method: 'PUT',
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="flex flex-col flex-1 h-screen overflow-auto">
      <div className="flex felx-row justify-between px-14 border-b py-8">
        <h1 className="text-3xl font-bold ">Readymade Orders</h1>
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
              <th className="border w-36">status</th>
              <th className="border w-20">Actions</th>
            </tr>
            {orderlists.map((orders, index) => {
              count++;
              return (
                <tr key={index} className="border h-auto">
                  <td className="border">{count}</td>
                  <td className="flex flex-col items-start justify-center px-10 gap-1 py-4">
                    <p className="text-[18px]">{orders?.address?.fullName}</p>
                    <p className="text-sm">{orders?.address?.phoneNumber}</p>
                    <p className="text-sm text-left">
                      {orders?.address?.addressLine1}
                    </p>
                    <p className="text-sm text-left">
                      {orders?.address?.addressLine2}
                    </p>
                    <p className="text-sm text-left">{orders?.address?.city}</p>
                    <p className="text-sm text-left">
                      {orders?.address?.state}
                    </p>
                    <p className="text-sm text-left">
                      {orders?.address?.addressType}
                    </p>
                  </td>
                  <td className="border px-10 py-4 h-auto">
                    <span className="block text-left">
                      Product name : {orders?.product?.name}
                    </span>
                    <span className="block text-left  ">
                      category : {orders?.product?.category}
                    </span>
                    <span className="block text-left ">
                      Payment method : {orders?.payment.method}
                    </span>
                    <span className="block text-left ">
                      orderedOn : {orders?.orderedOn}
                    </span>
                    <span className="block text-left text-green-500 bg-green-100 rounded-md px-8 py-2 my-3">
                      Total Prise : ₹ {orders?.totalAmount}{' '}
                    </span>
                    {orders?.technician?.name ? (
                      <span className="block text-left text-blue-500 bg-blue-100 rounded-md px-8 py-2">
                        technicion included
                      </span>
                    ) : (
                      <span className="block text-left text-red-500 bg-red-100 rounded-md px-8 py-2">
                        Technicion not included
                      </span>
                    )}
                  </td>
                  <td className="border ">
                    <select
                      onChange={(e) => {
                        let status = e.target.value;
                        handlechnage(orders._id, status);
                      }}
                      className="rounded-lg bg-green-100 w-fit py-2 mx-2 px-2"
                    >
                      <option value={`${orders.status}`}>
                        {orders.status}
                      </option>
                      <option value="shipped">shipped</option>
                      <option value="confirmed">confirmed</option>
                      <option value="outfordelivery">outfordelivery</option>
                      <option value="delivered">delivered</option>
                      <option value="cancle">cancle</option>
                    </select>
                  </td>
                  <td className="border">
                    <AiFillDelete
                      onClick={() => handledelete(orders._id)}
                      className="text-4xl p-2 rounded-lg bg-red-50 text-red-500 cursor-pointer bg-opacity-90 inline-block mx-1"
                    />
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
