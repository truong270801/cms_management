import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavbarLeft() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };
  const handleTbUser = () => {
    navigate("/tbuser");
  };
  const handleTbStream = () => {
    navigate("/tbstream");
  };
  const handleAddUser = () => {
    navigate("/adduser");
  };

  const handleAddStream = () => {
    navigate("/addstream");
  };
  const handleMonitorStream = () => {
    navigate("/monitorstream");
  };
  //const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);
  const [isDropdownOpenStream, setIsDropdownOpenStream] = useState(false);

  const toggleDropdownUser = () => {
    setIsDropdownOpenUser(!isDropdownOpenUser);
  };
  const toggleDropdownStream = () => {
    setIsDropdownOpenStream(!isDropdownOpenStream);
  };

  
  return (
    <div className="fixed top-12 left-0 w-48 h-full bg-gray-800 text-white font-bold p-4">
     
      <ul>
        <li
          className="flex items-center py-3  hover:bg-blue-600 rounded-md"
          onClick={handleHome}
        >
          <span className="material-icons mx-2">home</span>
          TRANG CHỦ
        </li>
        <li
          className="flex items-center py-3  hover:bg-blue-600 rounded-md"
          onClick={toggleDropdownStream}
        >
          <span className="material-icons mx-2">live_tv</span>
          STREAM
        </li>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 ${
            isDropdownOpenStream ? "" : "hidden"
          }`}
          id="submenu"
        >
          <h1
            className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
            onClick={handleTbStream}
          >
            Bảng stream
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
          onClick={handleAddStream}>
            Tạo mới stream
          </h1>
          <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
          onClick={handleMonitorStream}>
            Màn hình stream
          </h1>
        </div>
        <li
          className="flex items-center py-3  hover:bg-blue-600 rounded-md"
          onClick={toggleDropdownUser}
        >
          <span className="material-icons mx-2">person</span>
          USERS
         
        </li>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 ${
            isDropdownOpenUser ? "" : "hidden"
          }`}
          id="submenu"
        >
          <h1
            className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
            onClick={handleTbUser}
          >
            Bảng user
          </h1>
          <h1
            className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
            onClick={handleAddUser}
          >
            Tạo mới user
          </h1>
        </div>
       
      </ul>
    </div>
  );
}

export default NavbarLeft;
