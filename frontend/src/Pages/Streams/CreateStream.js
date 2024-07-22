import React, { useState } from "react";
import { createStream } from "../../Service/Stream_Service";
import Popup from "../../Component/Popup/Popup";
import NavbarTop from "../../Component/Navbar/NavbarTop";
import NavbarLeft from "../../Component/Navbar/NavbarLeft";

const CreateStream = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [stream, setStream] = useState({
    id: "",
    location: "",
    start: "",
    end: "",
    play_auth_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStream((prevStream) => ({
      ...prevStream,
      [name]: value,
    }));
    setError("");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setError("");
  };

  const formatRFC3339 = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const offset = -date.getTimezoneOffset();
    const timezoneOffset = (offset >= 0 ? '+' : '-') +
      ('0' + Math.abs(offset / 60)).slice(-2) +
      ':' +
      ('0' + Math.abs(offset % 60)).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffset}`;
  };

  const validateTimes = () => {
    const startTime = new Date(stream.start);
    const endTime = new Date(stream.end);
    const currentTime = new Date();

    if (endTime <= startTime) {
      setError("Thời gian kết thúc phải sau thời gian bắt đầu.");
      return false;
    }
    if (endTime <= currentTime) {
      setError("Thời gian kết thúc phải sau thời gian hiện tại.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!stream.location.trim()) {
      setError("Đường dẫn không được để trống.");
      return;
    }
    
    if (!validateTimes()) {
      return;
    }

    try {
      const formattedStream = {
        ...stream,
        start: formatRFC3339(new Date(stream.start)),
        end: formatRFC3339(new Date(stream.end)),
      };
      await createStream(formattedStream)
      setShowPopup(true);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Bạn không có quyền thực hiện thao tác này.");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div>
      <NavbarTop />
      <NavbarLeft />
      <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
        <h1 className="flex justify-center text-24">TẠO MỚI STREAM</h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label className="mr-4">VideoID: </label>
                    <input
                      type="text"
                      name="id"
                      value={stream.id}
                      placeholder="a1b2c3d4"
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label className="mr-4">Thời gian bắt đầu: </label>
                    <input
                      type="datetime-local"
                      name="start"
                      value={stream.start}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label className="mr-4">Thời gian kết thúc: </label>
                    <input
                      type="datetime-local"
                      name="end"
                      value={stream.end}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Đường dẫn: </label>
                    <input
                      type="text"
                      name="location"
                      value={stream.location}
                      placeholder="/all/file1.m3u8"
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Loại xác thực: </label>
                    <select
                      type="text"
                      name="play_auth_type"
                      value={stream.play_auth_type}
                      onChange={handleChange}
                      className="h-10 border ml-4 mt-1 rounded px-4  bg-gray-50"
                    >
                      <option value="">Không xác thực</option>
                      <option value="token">Có xác thực bằng token</option>

                    </select>

                  </div>

                  {error && (
                    <Popup message={error} onClose={handleClosePopup} />
                  )}
                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Gửi
                      </button>
                      {showPopup && (
                        <Popup
                          message="Tạo phiên stream thành công!"
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

export default CreateStream;
