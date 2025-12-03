import React, { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { RiEditBoxFill } from 'react-icons/ri';

export default function Session() {
  let count = 0;
  const [Sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('https://student-support-s0xt.onrender.com/ProjectNavigator/sessions')
      .then((data) => data.json())
      .then((data) => setSessions(data.sessions));
  }, []);

  return (
    <div className="flex flex-col flex-1 h-screen overflow-auto">
      <div className="flex felx-row justify-between px-14 border-b py-8">
        <h1 className="text-3xl font-bold ">Session</h1>
      </div>

      <div className="flex flex-col flex-grow mx-14 my-14 rounded-t-2xl border h-auto ">
        <div className="flex flex-row justify-between items-center w-full  px-8 py-8 border-b">
          <div className="flex flex-row  items-center gap-5 ">
            <FaUsers className="text-6xl text-green-500 p-3 text-opacity-70 rounded-md bg-green-50" />
            <h1 className="text-2xl font-bold">All Sessions</h1>
          </div>
          <p className="text-2xl text-black font-bold bg-opacity-75">
            total Sessions :{' '}
            <span className="text-green-500">{Sessions.length}</span>
          </p>
        </div>
        {Sessions.length > 0 ? (
          <table className="text-center border-collapse">
            <tr className="h-20">
              <th className="border w-20">Sl.No</th>
              <th className="border w-80">User info</th>
              <th className="border w-50">Date & Time </th>
              <th className="border w-50">language</th>
              <th className="border w-50">Actions</th>
            </tr>
            {Sessions.map((Session, index) => {
              count++;
              return (
                <tr key={index} className="border h-20">
                  <td className="border">{count}</td>
                  <td className="flex flex-col items-start justify-center px-10 gap-1 py-4">
                    <p className="text-[18px]">{Session.name}</p>
                    <p className="text-sm">{Session.email}</p>
                    <p className="text-sm">
                      Posted At : {Session.createdAt.slice(0, 10)}
                    </p>
                  </td>
                  <td className="border">
                    <span className="block text-center">{Session.date}</span>
                    <span className="block ">{Session.time}</span>
                  </td>
                  <td className="border ">
                    <span className="px-4 py-1 rounded-lg">
                      {Session.language}
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
            No Sessions yet
          </div>
        )}
      </div>
    </div>
  );
}
