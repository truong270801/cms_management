import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import UserContext from '../Context/UserContext';
import { jwtDecode } from "jwt-decode"; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const LOGIN_USER_URL = `${API_BASE_URL}/login`;
const REFRESH_TOKEN_URL = `${API_BASE_URL}/refreshtoken`;

const Login = () => {
  const { onLogin } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      if (token && refreshToken) {
        try {
          const decodedToken = jwtDecode(token); 
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            const username = localStorage.getItem("username");
            onLogin(username);
            navigate("/TbStream");
          } else {
            const response = await axios.post(REFRESH_TOKEN_URL, { 
              refresh_token: refreshToken 
            });
            localStorage.setItem("token", response.data.access_token);
            const username = localStorage.getItem("username");
            onLogin(username);
            navigate("/TbStream");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("username");
        }
      }
    };
    autoLogin();
  }, [onLogin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_USER_URL,
        { username, password },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (response.data.access_token && response.data.refresh_token) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        localStorage.setItem("username", username);
        setError("Đăng nhập thành công!");
        onLogin(username);
        navigate("/TbStream");
      } else {
        setError("Đăng nhập thất bại!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Thông tin đăng nhập không chính xác. Vui lòng thử lại.");
        } else {
          setError(`Lỗi đăng nhập: ${error.response.data.message || 'Vui lòng thử lại.'}`);
        }
      } else if (error.request) {
        setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.");
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-[#E9ECEF]">
      <div className="bg-[#055EA8] w-[100px] h-[100px]">
        <img className="p-4" alt="Học trực tuyến - Hệ thống giáo dục HOCMAI" src="https://hocmai.vn/assets/front/images/logo.png" />
      </div>
     
      <h1 className="text-[24px] my-4">HOCMAI - RESTREAM</h1>
      <div className="w-[400px] bg-white p-8 rounded-[10px]">
        <p className="text-[16px] mb-6 text-center">
          Vui lòng đăng nhập tài khoản của bạn</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-gray-200 hover:bg-gray-300 px-3 py-2 border rounded-md text-black-700"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-gray-200 hover:bg-gray-300 px-3 py-2 border rounded-md text-black-700"
            />
          </div>
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
           ĐĂNG NHẬP
          </button>
          <p className="text-center my-4">- Hoặc đăng nhập với - </p>
          <button
            type="button"
            className="w-full bg-[#DC3545] text-white py-2 rounded-md hover:bg-[#DD0029]"
          >
            <i className="fab fa-google-plus-g mr-2"></i>
             Đăng nhập bằng email HOCMAI 
          </button> 
        </form>
      </div>
    </div>
  );
};

export default Login;
