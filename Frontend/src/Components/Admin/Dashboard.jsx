import React, { useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { FaBagShopping } from 'react-icons/fa6';
import { BiCustomize } from 'react-icons/bi';
import { Contact } from 'lucide-react';
import { RiNewsLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const baseurl = `${import.meta.env.VITE_API_URL}`;

export default function Dashboard() {
  const [data, setdata] = useState({
    totalProducts: '',
    totalCustomOrders: '',
    totalReadymadeOrders: '',
    totalContacts: '',
    totalNewsletter: '',
    totalUsers: '',
  });

  useEffect(() => {
    fetch(`${baseurl}/admin/info`)
      .then((data) => data.json())
      .then((data) => setdata(data));
  }, []);

  return (
    <div className="flex flex-col flex-1 h-screen overflow-scroll">
      <div className="flex felx-row justify-between px-14 border-b py-8">
        <h1 className="text-3xl font-bold ">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 px-14 mt-16">
        <Link
          to={`/admin/CustomOrders`}
          className="flex flex-row justify-between gap-5 items-center p-8 rounded-xl border "
        >
          <FaBagShopping className="text-7xl p-5 bg-yellow-50 rounded-[26px] text-yellow-500 text-opacity-70" />

          <div className="flex flex-col items-end gap-2">
            <p className="text-3xl font-bold">{data.totalCustomOrders}</p>
            <p className="text-gray-700 text-lg font-semibold">
              Total Custom Orders
            </p>
          </div>
        </Link>

        <Link
          to={`/admin/ReadymadeOrders`}
          className="flex flex-row justify-between gap-5 items-center p-8 rounded-xl border "
        >
          <FaBagShopping className="text-7xl p-5 bg-blue-50 rounded-[26px] text-blue-500 text-opacity-70" />

          <div className="flex flex-col items-end gap-2">
            <p className="text-3xl font-bold">{data.totalReadymadeOrders}</p>
            <p className="text-gray-700 text-lg font-semibold">
              Total Ready Made Orders
            </p>
          </div>
        </Link>

        <Link
          to={`/admin/Users`}
          className="flex flex-row justify-between gap-5 items-center p-8 rounded-xl border"
        >
          <FaUsers className="text-7xl p-5 bg-green-50 rounded-[26px] text-green-500 text-opacity-70" />

          <div className="flex flex-col items-end gap-2">
            <p className="text-3xl font-bold">{data.totalUsers}</p>
            <p className="text-gray-700 text-lg font-semibold">Total Users</p>
          </div>
        </Link>

        <Link
          to={`/admin/Session`}
          className="flex flex-row justify-between gap-5 items-center p-8 rounded-xl border"
        >
          <Contact
            size={70}
            className="p-5 bg-green-50 rounded-[26px] text-green-500 text-opacity-70"
          />
          <div className="flex flex-col items-end gap-2">
            <p className="text-3xl font-bold">{data.totalContacts}</p>
            <p className="text-gray-700 text-lg font-semibold">
              Total Contacts
            </p>
          </div>
        </Link>

        <Link
          to={`/admin/Session`}
          className="flex flex-row justify-between gap-5 items-center p-8 rounded-xl border"
        >
          <RiNewsLine className="text-7xl p-5 bg-green-50 rounded-[26px] text-green-500 text-opacity-70" />
          <div className="flex flex-col items-end gap-2">
            <p className="text-3xl font-bold">{data.totalNewsletter}</p>
            <p className="text-gray-700 text-lg font-semibold">
              Total Newsletter
            </p>
          </div>
        </Link>

        <div className="flex flex-row justify-between gap-5 items-center p-8 rounded-xl border ">
          <FaBox className="text-7xl p-5 bg-red-50 rounded-[26px] text-red-500 text-opacity-70" />

          <div className="flex flex-col  gap-2 items-end">
            <p className="text-3xl font-bold">{data.totalProducts}</p>
            <p className="text-gray-700 text-lg font-semibold text-right">
              Total Products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
