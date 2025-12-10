import { BsArrowRightCircleFill } from 'react-icons/bs';
import Headphone from '../assets/Headphone.png';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const baseurl = `${import.meta.env.VITE_API_URL}`;

export default function Subscribe() {
  const [email, setemail] = useState('');
  const [modal, setmodal] = useState(false);

  const handlechange = (e) => setemail(e.target.value);
  let token = localStorage.getItem('token');

  const submit = () => {
    if (email === '') {
      return;
    }

    fetch(`${baseurl}/User/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ email: email }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setemail('');
        setmodal(true);

        setTimeout(() => {
          setmodal(false);
        }, 3000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col w-full px-10 mt-40">
      <div className="flex flex-row justify-between   px-10 bg-red-500 bg-opacity-75 w-full h-[450px] rounded-[80px] rounded-tr-[800px]">
        <div className="flex flex-col justify-center gap-3 ml-10">
          <p className="text-white font-semibold">NEWSLETTER</p>

          <h1 className="text-white text-5xl w-96 font-bold">
            Subscribe our newsletter.
          </h1>

          <div className="rounded-full w-[480px] h-20 border flex flex-col justify-center items-center mt-2 relative">
            <input
              type="text"
              name="email"
              value={email}
              onChange={handlechange}
              className="outline-none pl-6 pr-10 rounded-full self-center w-full h-full"
              placeholder="Enter your email address "
            />
            <BsArrowRightCircleFill
              onClick={submit}
              className="text-5xl absolute right-4 cursor-pointer"
            />
          </div>
        </div>

        <div className="relative w-[420px]">
          <img
            src={Headphone}
            alt="headphone"
            className="w-full h-full absolute -top-32 right-16"
          />
          <div className="bg-yellow-300 rounded-full w-16 h-16 absolute bottom-20"></div>
          <div className="bg-blue-300 rounded-full w-10 h-10 absolute bottom-20 right-0"></div>
        </div>
      </div>

      {modal && (
        <div className="fixed bg-white w-80 h-20 border rounded-md shadow-lg bottom-5 right-5">
          <p className="text-center flex w-full h-full justify-center items-center text-green-700 text-xl">
            Subscribed to Newsletter 🎉
          </p>
        </div>
      )}
    </div>
  );
}
