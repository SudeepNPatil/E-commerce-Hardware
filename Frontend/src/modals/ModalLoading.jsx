import React from 'react';

export default function ModalLoading({ isOpen }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 w-full h-[100vh] bg-black bg-opacity-40 flex flex-col justify-center items-center">
      <div className="flex flex-col animate-spin  border-r-8  border-l-8  rounded-full border-red-500 bg-white h-16 w-16"></div>
    </div>
  );
}
