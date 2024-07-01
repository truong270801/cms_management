import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom' 
import UserContext from '../Context/UserContext';

const Login =  () => {
  const { onLogin } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        { username, password },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        setError("Đăng nhập thành công!");
        onLogin(username);
        navigate("/TbStream")
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
    <div className="flex items-center justify-center min-h-screen bg-yellow-300">
      <div className="w-[400px] bg-white  p-8 rounded-[10px]">
        <h2 className="text-[32px] font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-gray-200  hover:bg-gray-300 px-3 py-2 border rounded-md text-black-700"
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
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
