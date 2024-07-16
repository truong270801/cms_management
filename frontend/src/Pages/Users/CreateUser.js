import React, { useState } from "react";
import axios from "axios";
import Popup from "../../Component/Popup/Popup";
import NavbarTop from "../../Component/Navbar/NavbarTop";
import NavbarLeft from "../../Component/Navbar/NavbarLeft";

const CreateUser = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    role: "",
    avatar: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8000/users/create",
        {
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarTop />
      <NavbarLeft />
      <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
        <h1 className="flex justify-center text-24">CREATE USER</h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label>Tên đầy đủ</label>
                    <input
                      type="text"
                      name="fullname"
                      value={user.fullname}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Mật khẩu</label>
                    <input
                      type="text"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="w-[150px] sm:col-span-5">
                    <label>Quyền</label>
                    <select
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Lựa chọn</option>
                      <option value="admin">Quản lý</option>
                      <option value="member">Thành viên</option>
                    </select>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                      {showPopup && (
                        <Popup
                          message="Tạo người dùng thành công!"
                          onClose={handleClosePopup}
                        />
                      )}
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

export default CreateUser;
