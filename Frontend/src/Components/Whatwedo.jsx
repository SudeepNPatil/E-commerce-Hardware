import person from '../assets/person.png';
import nana from '../assets/try.png';
import earbuds from '../assets/earbuds.png';
import Mouse from '../assets/Mouse.png';

export default function Whatwedo() {
  return (
    <>
      <div className="flex flex-row gap-10 border justify-between mt-32 px-28 mb-48">
        <div className="bg-yellow-500 relative h-[620px] w-[560px] rounded-3xl rounded-bl-[80px] rounded-tr-[420px] flex flex-col justify-end items-center">
          <img src={nana} alt="person" className="object-cover h-[500px] " />
          <img
            src={earbuds}
            alt="earbuds"
            className="absolute top-10 right-24 w-28"
          />
        </div>

        <div className="flex-shrink-0 w-96 border relative">
          <img
            src={Mouse}
            alt="mouse"
            className="absolute  -bottom-60 rounded-full -right-32 w-96"
          />
        </div>
      </div>
      <div className="bg-red-50 w-full h-[650px] -mt-16">
        <h1 className="text-red-500 tracking-[8px] font-semibold text-center pt-16">
          EXPERT TECHNICIAN
        </h1>
        <h1 className="text-center text-5xl font-bold text-black mt-5">
          Let's meet the expert.
        </h1>
        <div className="flex flex-row justify-around items-center mt-20">
          <div className="rounded-full  border-2 border-white rounded-tr-3xl w-60 h-60 bg-blue-300 shadow-2xl relative">
            <div className="bg-white rounded-full w-20 h-20 absolute bottom-0 right-0 text-blue-500 text-5xl font-bold flex flex-col justify-center items-center">
              in
            </div>
          </div>

          <div className="rounded-full  border-2 border-white rounded-tr-3xl w-60 h-60 bg-yellow-300 shadow-2xl relative">
            <div className="bg-white rounded-full w-20 h-20 absolute bottom-0 right-0 text-blue-500 text-5xl font-bold flex flex-col justify-center items-center">
              in
            </div>
          </div>

          <div className="rounded-full  border-2 border-white rounded-tr-3xl w-60 h-60 bg-red-400 shadow-2xl relative">
            <div className="bg-white rounded-full w-20 h-20 absolute bottom-0 right-0 text-blue-500 text-5xl font-bold flex flex-col justify-center items-center">
              in
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
