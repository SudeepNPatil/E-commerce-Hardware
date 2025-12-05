import React, { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { RiEditBoxFill, RiNewsLine } from 'react-icons/ri';

export default function Session() {
  let count = 0;
  let count1 = 0;
  const [Contacts, setContacts] = useState([]);
  const [Newsletter, setNewsletter] = useState([]);
  let token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/User/newsletter')
      .then((data) => data.json())
      .then((data) => setNewsletter(data.newsletter));

    fetch('http://localhost:5000/Contactinfo')
      .then((data) => data.json())
      .then((data) => setContacts(data.Contacts));
  }, []);

  const handledelete = (id) => {
    fetch(`http://localhost:5000/User/deletenewsletter/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        let upadtednewleter = Newsletter.filter((newlet) => newlet._id != id);
        setNewsletter(upadtednewleter);
      })
      .catch((err) => console.error(err));
  };

  const handledeletecontact = (id) => {
    fetch(`http://localhost:5000/Contactinfo/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        let upadtedSessions = Contacts.filter((sess) => sess._id != id);
        setContacts(upadtedSessions);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col flex-1  h-screen overflow-scroll">
      <div className="flex felx-row justify-between px-14 border-b py-8">
        <h1 className="text-3xl font-bold ">Contacts & Newsletter</h1>
      </div>

      <div className="flex flex-col flex-grow mx-14 my-14 rounded-t-2xl border">
        <div className="flex flex-row justify-between items-center w-full  px-8 py-8 border-b">
          <div className="flex flex-row  items-center gap-5 ">
            <FaUsers className="text-6xl text-green-500 p-3 text-opacity-70 rounded-md bg-green-50" />
            <h1 className="text-2xl font-bold">All Contacts</h1>
          </div>
          <p className="text-2xl text-black font-bold bg-opacity-75">
            total Contacts :{' '}
            <span className="text-green-500">{Contacts?.length || 0}</span>
          </p>
        </div>
        {Contacts?.length > 0 ? (
          <table className="text-center border-collapse">
            <tr className="h-20">
              <th className="border w-20">Sl.No</th>
              <th className="border w-50">Contact info</th>
              <th className="border w-80">message</th>
              <th className="border w-28">Actions</th>
            </tr>
            {Contacts.map((con, index) => {
              count++;
              return (
                <tr key={index} className="border h-20">
                  <td className="border">{count}</td>
                  <td className="flex flex-col items-start justify-center px-10 gap-1 py-4">
                    <p className="text-[18px]">{con.name}</p>
                    <p className="text-sm">{con.email}</p>
                    <p className="text-sm">{con.number}</p>
                    <p className="text-sm">
                      Posted At : {con.createdAt.slice(0, 10)}
                    </p>
                  </td>
                  <td className="border">
                    <span className="block text-center">{con.text}</span>
                  </td>
                  <td className="border">
                    {/*  <FaRegEye className="text-4xl p-2 rounded-lg bg-green-50 text-green-500 text-opacity-70 inline-block mx-1" />
                    <RiEditBoxFill className="text-4xl p-2 rounded-lg bg-blue-50 text-blue-500 text-opacity-70 inline-block mx-1" /> */}
                    <AiFillDelete
                      onClick={() => handledeletecontact(con._id)}
                      className="text-4xl p-2 cursor-pointer rounded-lg bg-red-50 text-red-500 bg-opacity-90 inline-block mx-1"
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <div className="flex justify-center items-center text-xl text-gray-700 min-h-80">
            No Contacts yet
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow mx-14 my-14 rounded-t-2xl border ">
        <div className="flex flex-row justify-between items-center w-full  px-8 py-8 border-b">
          <div className="flex flex-row  items-center gap-5 ">
            <RiNewsLine className="text-6xl text-green-500 p-3 text-opacity-70 rounded-md bg-green-50" />
            <h1 className="text-2xl font-bold">All Newsletter</h1>
          </div>
          <p className="text-2xl text-black font-bold bg-opacity-75">
            total newsletter :{' '}
            <span className="text-green-500">{Newsletter.length}</span>
          </p>
        </div>
        {Newsletter?.length > 0 ? (
          <table className="text-center border-collapse">
            <tr className="h-20">
              <th className="border w-20">Sl.No</th>
              <th className="border w-fit">Newsletter</th>
              <th className="border w-50">Actions</th>
            </tr>
            {Newsletter.map((newslet, index) => {
              count1++;
              return (
                <tr key={index} className="border h-20">
                  <td className="border">{count1}</td>
                  <td className="flex flex-col items-start justify-center px-10 gap-1 py-4">
                    <p className="text-sm">{newslet.email}</p>
                  </td>

                  <td className="border">
                    {/*  <FaRegEye className="text-4xl p-2 rounded-lg bg-green-50 text-green-500 text-opacity-70 inline-block mx-1" />
                    <RiEditBoxFill className="text-4xl p-2 rounded-lg bg-blue-50 text-blue-500 text-opacity-70 inline-block mx-1" /> */}
                    <AiFillDelete
                      onClick={() => handledelete(newslet._id)}
                      className="text-4xl p-2 rounded-lg cursor-pointer bg-red-50 text-red-500 bg-opacity-90 inline-block mx-1"
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <div className="flex justify-center items-center h-full text-xl text-gray-700 min-h-80">
            No Newsletter yet
          </div>
        )}
      </div>
    </div>
  );
}
