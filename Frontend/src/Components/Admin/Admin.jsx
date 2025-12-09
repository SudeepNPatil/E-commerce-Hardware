import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { LuUsersRound } from 'react-icons/lu';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { MdAdminPanelSettings } from 'react-icons/md';
import { SiSession } from 'react-icons/si';
import { RiDashboard3Fill } from 'react-icons/ri';
import { AiOutlineProduct } from 'react-icons/ai';

export default function Admin() {
  const navigate = useNavigate();

  const location = useLocation();

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
            className={`text-center ${
              location.pathname === '/admin/Dashboard'
                ? 'bg-green-50 border-r-2 border-r-blue-600'
                : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <RiDashboard3Fill className="text-2xl " />
            <h1 className="text-lg">Dashboard</h1>
          </Link>

          <Link
            to="/admin/Users"
            className={`text-center ${
              location.pathname === '/admin/Users'
                ? 'bg-green-50 border-r-2 border-r-blue-600'
                : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <LuUsersRound className="text-2xl " />
            <h1 className="text-lg">Users</h1>
          </Link>

          <Link
            to="/admin/addProducts"
            className={`text-center ${
              location.pathname === '/admin/addProducts'
                ? 'bg-green-50 border-r-2 border-r-blue-600'
                : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <AiOutlineProduct className="text-2xl " />
            <h1 className="text-lg">Add Products</h1>
          </Link>

          <Link
            to="/admin/Customorders"
            className={`text-center ${
              location.pathname === '/admin/Customorders'
                ? 'bg-green-50 border-r-2 border-r-blue-600'
                : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <FaCartArrowDown className="text-2xl " />
            <h1 className="text-lg">Custom Orders</h1>
          </Link>

          <Link
            to="/admin/Readymadeorders"
            className={`text-center ${
              location.pathname === '/admin/Readymadeorders'
                ? 'bg-green-50 border-r-2 border-r-blue-600'
                : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <FaCartArrowDown className="text-2xl " />
            <h1 className="text-lg">ReadyMade Orders</h1>
          </Link>

          <Link
            to="/admin/Session"
            className={`text-center ${
              location.pathname === '/admin/Session'
                ? 'bg-green-50 border-r-2 border-r-blue-600'
                : ''
            } text-black w-full h-14 flex flex-row pl-16 items-center gap-3 hover:bg-green-50 hover:border-r-blue-600 hover:border-r-2`}
          >
            <SiSession className="text-2xl " />
            <h1 className="text-lg">Contacts & Newsletter</h1>
          </Link>
        </div>

        <div
          onClick={() => (
            localStorage.removeItem('token'), (window.location.href = '/Home')
          )}
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
