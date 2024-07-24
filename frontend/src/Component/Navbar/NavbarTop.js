// src/components/NavbarTop.js
import React, { useState, useContext  } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext'

const NavbarTop = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, onLogout } = useContext(UserContext);
  const handleHome = () => {
    navigate("/tbstream");
  };
  const handleLogout = () => {
     localStorage.clear();
     sessionStorage.clear();
     onLogout();
     navigate('/', { replace: true });
  };

  return (
    <div className="w-full h-[50px] bg-[#3C8DBC] flex items-center justify-between px-4 text-white fixed top-0 z-10">
      <div className="flex items-center space-x-4">
        <h1 className="font-bold text-[24px] ml-4 cursor-pointer" 
        onClick={handleHome}>AdminLTE</h1>
        {/* <span className="material-icons hover:text-yellow-300 cursor-pointer">menu</span> */}
      </div>

      <div className="relative">
        <div className="flex items-center space-x-4 cursor-pointer">
          <img
            src="https://anvientv.com.vn/uploads/upload/1664959678_anh-co-do-sao-vang.jpg"
            alt="Sample"
            className="rounded-full w-8 h-8"
          />
          <p className="text-sm">{user}</p>
          <span
            className="material-icons"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            settings
          </span>
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-md shadow-lg">
            <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
            > 
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarTop;
