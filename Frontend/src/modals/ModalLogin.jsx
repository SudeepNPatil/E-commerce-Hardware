import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const ModalLogin = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-96  relative shadow-lg animate-bounceIn">
        <RxCross2
          onClick={onClose}
          className="absolute right-3 top-3 text-xl cursor-pointer text-gray-500 hover:text-black"
        ></RxCross2>

        {children}
      </div>
    </div>
  );
};

export default ModalLogin;
