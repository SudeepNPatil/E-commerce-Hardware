import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useLogincontext } from '../Context/LoginContext';
import ModalLogin from '../modals/ModalLogin';
import ModalLoading from '../modals/ModalLoading';
import { BiSolidUserX } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

export default function Contact() {
  const { logindata } = useLogincontext();
  const [infomodal, setinfomodal] = useState(false);
  const [serverinfo, setserverinfo] = useState(null);
  const [error, seterror] = useState('');
  const [modalstate, setmodalstate] = useState(false);
  const [checklogin, setchecklogin] = useState(false);
  const [contact, setcontact] = useState({
    name: '',
    email: '',
    number: '',
    text: '',
  });

  const handlechange = (e) => {
    const { name, value } = e.target;

    setcontact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!contact.name || !contact.number || !contact.email) {
      seterror('⚠ Please fill all the details..!');
      return;
    }

    if (Object.keys(logindata).length > 0) {
      setmodalstate(true);
      const token = localStorage.getItem('token');

      let res = await fetch('http://localhost:5000/Contactinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(contact),
      });

      let result = await res.json();

      setmodalstate(false);
      setinfomodal(true);
      setcontact({
        name: '',
        email: '',
        number: '',
        text: '',
      });
      setserverinfo(result.message);
    } else {
      setchecklogin(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center my-20">
        <div className="flex flex-col sm:flex-row w-screen  xl:w-9/12 lg:w-11/12 md:w-11/12 h-auto rounded-xl shadow-xl shadow-red-100  pb-5">
          <div className="flex flex-col h-auto w-full px-10 mt-10">
            <h1 className="text-2xl sm:text-[35px] font-bold mb-4 pt-36 sm:pt-40 transform scale-y-110 text-red-500">
              Let's <span className="text-black">Connect </span>
            </h1>
            <p className="sm:mt-6 mt-3 pr-8 sm:pr-0 sm:max-w-96 text-sm sm:text-base">
              Have any doubt about our service ? let me know any thing you need
              Help from us by filling contact form and we will connet you soon.
            </p>
            <h1 className="text-lg sm:text-xl font-bold mt-6 sm:mt-9">Email</h1>
            <div className="flex inset-0 mt-2 gap-1">
              <MdOutlineMail className="w-5 h-5 sm:mt-[3px]" />
              <p className="text-sm sm:text-base">hardwareshop@gmail.com</p>
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-6 sm:mt-9">
              {' '}
              Socials{' '}
            </h1>
            <div className="flex gap-5  mt-3">
              <FaInstagram className="sm:w-5 sm:h-5 w-4 h-4 hover:bg-red-500 hover:rounded-full cursor-pointer  hover:scale-125 duration-500 ease-in-out" />
              <BsTwitterX className="sm:w-5 sm:h-5 w-4 h-4 hover:bg-red-500 hover:rounded-full cursor-pointer  hover:scale-125 duration-500 ease-in-out" />
              <FaLinkedin className="sm:w-5 sm:h-5 w-4 h-4 hover:bg-red-500 hover:rounded-full cursor-pointer hover:scale-125 duration-500 ease-in-out" />
            </div>
          </div>

          <div className="flex flex-col h-auto w-full pt-16 sm:pt-24 px-10">
            <label htmlFor="name">Name </label>

            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={handlechange}
              className="border mt-1 mb-4 h-10 rounded-md pl-2 block text-sm"
              placeholder="Enter your Name"
            />

            <label htmlFor="Email">Email </label>

            <input
              type="Email"
              id="Email"
              name="email"
              value={contact.email}
              onChange={handlechange}
              className="border mt-1 mb-4   h-10 rounded-md pl-2 block text-sm"
              placeholder="Enter your Email id"
            />

            <label htmlFor="number">Phone Number</label>

            <input
              type="number"
              id="number"
              name="number"
              value={contact.number}
              onChange={handlechange}
              className="border mt-1 mb-4  h-10 rounded-md pl-2 block text-sm"
              placeholder="Enter your Phone Number"
            />

            <label htmlFor="text" className="block">
              Message (optional)
            </label>

            <textarea
              name="text"
              id="text"
              value={contact.text}
              onChange={handlechange}
              placeholder="write what you want to ask about..."
              className="text-sm  pl-3 pt-2 mt-1 mb-4 min-h-28 border rounded-md"
            ></textarea>

            {error && (
              <p className="text-red-500 text-sm font-normal  mb-4">{error}</p>
            )}

            <button
              onClick={handlesubmit}
              type="button"
              className="bg-red-500 text-white block h-10 rounded-md mb-4 hover:bg-red-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {infomodal && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 p-5 border-green-500 shadow-green-200 shadow-md h-[70px] bg-white border rounded-md">
          <RxCross2
            onClick={() => setinfomodal(false)}
            className="absolute right-3 top-5 text-2xl cursor-pointer text-gray-500 hover:text-black"
          ></RxCross2>
          <p className="mr-16 font-semibold text-xl">{serverinfo}</p>
        </div>
      )}

      <ModalLoading isOpen={modalstate}></ModalLoading>

      <ModalLogin isOpen={checklogin} onClose={() => setchecklogin(false)}>
        <div>
          <div className="flex flex-col px-2 gap-2">
            <BiSolidUserX className="self-center text-red-500 text-6xl" />

            <h1 className="text-black opacity-75 font-bold text-2xl text-center">
              Login Please..!
            </h1>

            <p className="text-gray-700 text-lg">
              Please login to Book the your session to discuss
            </p>

            <Link
              to={`/Login`}
              className="py-2 px-2 block text-center border rounded-lg hover:bg-red-500 hover:text-white"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </ModalLogin>
    </>
  );
}
