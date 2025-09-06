export default function () {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-red-600 text-opacity-75 tracking-[10px] text-xl text-center">
        FEATURES
      </h1>

      <h1 className="text-5xl text-black text-center mt-3 font-bold text-opacity-95 w-[700px] leading-tight">
        Get a many of intresting Products
      </h1>

      <div className="flex flex-row mt-14 justify-around overflow-x-auto py-10 w-full">
        <div className="bg-gradient-to-b from-gray-100 to-white w-80 h-52 rounded-t-3xl relative mt-14">
          <div className="absolute -top-[85px] left-1/2 -translate-x-1/2 w-36 h-36 bg-white shadow-2xl rounded-full"></div>
        </div>

        <div className="bg-gradient-to-b from-gray-100 to-white w-80 h-52 rounded-t-3xl relative mt-14">
          <div className="absolute -top-[85px] left-1/2 -translate-x-1/2 w-36 h-36 bg-white shadow-2xl rounded-full"></div>
        </div>

        <div className="bg-gradient-to-b from-gray-100 to-white w-80 h-52 rounded-t-3xl relative mt-14">
          <div className="absolute -top-[85px] left-1/2 -translate-x-1/2 w-36 h-36 bg-white shadow-2xl rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
