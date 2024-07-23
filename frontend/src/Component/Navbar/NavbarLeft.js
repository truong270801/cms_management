import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavbarLeft() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);
  const [isDropdownOpenStream, setIsDropdownOpenStream] = useState(true); 
  const [activeItem, setActiveItem] = useState("/tbstream");

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/tbstream');
    } else {
      const path = location.pathname;
      if (path.includes("/tbstream") || path.includes("/addstream") || path.includes("/monitorstream")) {
        setIsDropdownOpenStream(true);
        setIsDropdownOpenUser(false);
        setActiveItem(path);
      } else if (path.includes("/tbuser") || path.includes("/adduser")) {
        setIsDropdownOpenUser(true);
        setIsDropdownOpenStream(false);
        setActiveItem(path);
      }
    }
  }, [location, navigate]);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveItem(path);
  };

  const toggleDropdownUser = () => {
    setIsDropdownOpenUser(!isDropdownOpenUser);
  };

  const toggleDropdownStream = () => {
    setIsDropdownOpenStream(!isDropdownOpenStream);
  };

  const getItemClassName = (path) => {
    return `cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1 ${activeItem === path ? "bg-blue-500" : ""
      }`;
  };

  return (
    <div className="fixed top-12 left-0 w-[200px] h-full bg-gray-800 text-white font-bold p-4">
      <ul>
        <li
          className="flex items-center py-3 hover:bg-blue-600 rounded-md cursor-pointer"
          onClick={toggleDropdownStream}
        >
          <span className="material-icons mx-2">live_tv</span>
          STREAM
        </li>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 ${isDropdownOpenStream ? "" : "hidden"
            }`}
          id="submenu"
        >
          <h1
            className={getItemClassName("/tbstream")}
            onClick={() => handleNavigation("/tbstream")}
          >
            Danh sách stream
          </h1>
          <h1
            className={getItemClassName("/addstream")}
            onClick={() => handleNavigation("/addstream")}
          >
            Tạo mới stream
          </h1>
          <h1
            className={getItemClassName("/monitorstream")}
            onClick={() => handleNavigation("/monitorstream")}
          >
            Màn hình stream
          </h1>
        </div>
        <li
          className="flex items-center py-3 hover:bg-blue-600 rounded-md cursor-pointer"
          onClick={toggleDropdownUser}
        >
          <span className="material-icons mx-2 ">person</span>
          USERS
        </li>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 ${isDropdownOpenUser ? "" : "hidden"
            }`}
          id="submenu"
        >
          <h1
            className={getItemClassName("/tbuser")}
            onClick={() => handleNavigation("/tbuser")}
          >
            Danh sách user
          </h1>
          <h1
            className={getItemClassName("/adduser")}
            onClick={() => handleNavigation("/adduser")}
          >
            Tạo mới user
          </h1>
        </div>
      </ul>
    </div>
  );
}

export default NavbarLeft;