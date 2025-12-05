import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LuUsersRound } from 'react-icons/lu';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { MdAdminPanelSettings } from 'react-icons/md';
import { SiSession } from 'react-icons/si';
import { RiDashboard3Fill } from 'react-icons/ri';
import { useState } from 'react';

export default function Admin() {
  const [bg, setbg] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between min-h-[100vh] w-[100vw]">
      <div className="flex flex-col justify-between w-[25vw] h-[100vh] shadow-lg border-r flex-shrink-0">
        <div className="flex flex-row  justify-center items-center border-b p-8 gap-2">
          <MdAdminPanelSettings className="text-4xl" />
          <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
        </div>

        <div className="flex flex-col justify-evenly h-full">
          <Link
            to="/admin/Dashboard"
            onClick={() => setbg(1)}
            className={`text-center ${
              bg == 1 ? 'bg-green-50 border-r-2 border-r-blue-600' : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <RiDashboard3Fill className="text-2xl " />
            <h1 className="text-lg">Dashboard</h1>
          </Link>

          <Link
            to="/admin/Users"
            onClick={() => setbg(2)}
            className={`text-center ${
              bg == 2 ? 'bg-green-50 border-r-2 border-r-blue-600' : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <LuUsersRound className="text-2xl " />
            <h1 className="text-lg">Users</h1>
          </Link>

          <Link
            to="/admin/Customorders"
            onClick={() => setbg(3)}
            className={`text-center ${
              bg == 3 ? 'bg-green-50 border-r-2 border-r-blue-600' : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <FaCartArrowDown className="text-2xl " />
            <h1 className="text-lg">Custom Orders</h1>
          </Link>

          <Link
            to="/admin/Readymadeorders"
            onClick={() => setbg(4)}
            className={`text-center ${
              bg == 4 ? 'bg-green-50 border-r-2 border-r-blue-600' : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <FaCartArrowDown className="text-2xl " />
            <h1 className="text-lg">ReadyMade Orders</h1>
          </Link>

          <Link
            to="/admin/Session"
            onClick={() => setbg(5)}
            className={`text-center ${
              bg == 5 ? 'bg-green-50 border-r-2 border-r-blue-600' : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <SiSession className="text-2xl " />
            <h1 className="text-lg">Contacts & Newsletter</h1>
          </Link>
        </div>

        <div
          onClick={() => navigate('/Home')}
          className="flex flex-row pl-16 items-center gap-3 p-8 border-t hover:text-red-500 hover:cursor-pointer"
        >
          <MdLogout className="text-3xl " />
          <p className="font-bold text-red-500 text-opacity-90 text-xl">
            Logout
          </p>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
