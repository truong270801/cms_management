import React, { useEffect, useState } from "react";
import { tableUser } from "../../Service/User_Service";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import NavbarTop from "../../Component/Navbar/NavbarTop";
import NavbarLeft from "../../Component/Navbar/NavbarLeft";
import Popup from "../../Component/Popup/Popup";


const TableUser = () => {
  const [data, setData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const getData = async () => {
      try {
        const users = await tableUser();
        setData(users);
      } catch (error) {
        setShowPopup(true);
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleUserDeleted = (userId) => {
    setData(data.filter((user) => user.id !== userId));
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleUserUpdated = (updatedUser) => {
    setData(
      data.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <NavbarTop />
      <NavbarLeft />
      <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
        <h1 className="flex justify-center text-24">DANH SÁCH NGƯỜI DÙNG</h1>
        <div className="overflow-x-auto overflow-y-auto">
          <table className="min-w-full bg-white mt-8">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  ID
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Tên đầy đủ
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Username
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Mật khẩu
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Quyền
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data.map((user) => (
                <tr key={user.id}>
                  <td className="text-left py-3 px-4">{user.id}</td>
                  <td className="text-left py-3 px-4">{user.fullname}</td>
                  <td className="text-left py-3 px-4">{user.username}</td>
                  <td className="text-left py-3 px-4">{user.password}</td>
                  <td className="text-left py-3 px-4">{user.role}</td>
                  <td className="text-left py-3 px-4 flex flex-row">
                    <span
                      className="material-icons text-gray-600 cursor-pointer"
                      onClick={() => handleEditClick(user)}
                    >
                      edit
                    </span>
                    <DeleteUser
                      userId={user.id}
                      onUserDeleted={handleUserDeleted}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showUpdateModal && selectedUser && (
          <UpdateUser
          className = "cursor-pointer"
            user={selectedUser}
            onUserUpdate={(updatedUser) => {
              handleUserUpdated(updatedUser);
              setShowUpdateModal(false);
            }}
            onClose={() => setShowUpdateModal(false)}
          />
        )}
        {showPopup && (
            <Popup
              message="Bạn không có quyền thực hiện thao tác này."
              onClose={handleClosePopup}
            />
          )}
      </div>
    </div>
  );
};

export default TableUser;
