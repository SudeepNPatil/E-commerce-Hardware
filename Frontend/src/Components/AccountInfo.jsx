import React, { useState } from 'react';
import {
  LogOut,
  Package,
  Trash2,
  Mail,
  User,
  CheckCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLogincontext } from '../Context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ModalLoading from '../modals/ModalLoading';

export default function AccountInfoPage() {
  const { logindata, setlogininfo } = useLogincontext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loadingmodal, setloadingmodal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  let orders = [];

  const baseurl = `${import.meta.env.VITE_API_URL}`;

  const handleLogout = () => {
    setShowDeleteModal(false);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      localStorage.removeItem('token');
      setlogininfo({});
      navigate('/Home');
    }, 2000);
  };

  const handleDeleteAccount = () => {
    setloadingmodal(true);
    setShowDeleteModal(false);
    const token = localStorage.getItem('token');
    fetch(`${baseurl}/User/${logindata?.user?._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setloadingmodal(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          localStorage.removeItem('token');
          setlogininfo({});
          navigate('/Home');
        }, 2500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Account info</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
              {logindata?.user?.firstname[0]?.toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {logindata?.user?.firstname} {logindata?.user?.lastname}
            </h2>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <Mail size={18} />
              <span>{logindata?.user?.Email}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                  <User className="text-blue-500" size={24} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Full Name
                    </p>
                    <p className="font-semibold text-gray-800">
                      {logindata?.user?.firstname} {logindata?.user?.lastname}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center gap-3">
                  <Mail className="text-yellow-600" size={24} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Email Address
                    </p>
                    <p className="font-semibold text-gray-800 truncate">
                      {logindata?.user?.Email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-red-500" size={28} />
            <h3 className="text-2xl font-bold text-gray-800">Recent Orders</h3>
          </div>

          {orders?.length > 0 ? (
            <div className="space-y-4">
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-red-300 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-1">
                      Order {order.id}
                    </p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-3 md:mt-0">
                    <span className="text-lg font-bold text-red-500">
                      {order.total}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          )}
        </div> */}

        {/* Delete Account Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-200">
          <div className="flex items-start gap-4">
            <Trash2 className="text-red-500 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Delete Account
              </h3>
              <p className="text-gray-600 mb-4">
                Once you delete your account, there is no going back. All your
                data will be permanently removed.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="text-red-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Delete Account?
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform animate-slideUp">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle
                    className="text-white"
                    size={48}
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Successfully Logged Out!
                </h3>
                <p className="text-gray-600">
                  You have been safely logged out of your account.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl transform animate-scaleIn">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                  <CheckCircle2
                    className="text-white animate-checkmark"
                    size={56}
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                Account Deleted Successfully!
              </h3>
              <p className="text-gray-600 text-lg">
                Your account has been permanently removed from our system.
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalLoading isOpen={loadingmodal}></ModalLoading>
    </div>
  );
}
