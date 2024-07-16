import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const UpdateUser = ({ user, onUserUpdate, onClose }) => {
    
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    password: '',
    avatar: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        fullname: user.fullname || '',
        username: user.username || '',
        password: user.password || '',
        avatar: user.avatar || '',
        role: user.role || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://127.0.0.1:8000/users/${user.id}`, 
        { user: userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUserUpdate(response.data.user);
      alert('Successfully');
    onClose();
    } catch (error) {
      console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white w-[80%] max-w-lg mx-auto rounded-lg p-8 z-50">
        <h1 className="flex justify-center text-24">UPDATE USER</h1>
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={userData.fullname}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label>User Name</label>
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>
                 
                  <div className="w-[150px] sm:col-span-5">
                    <label>Role</label>
                    <select
                      name="role"
                      value={userData.role}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Chọn vai trò</option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
                  </div>
                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
