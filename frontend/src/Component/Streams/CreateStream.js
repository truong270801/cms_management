import React, { useState } from "react";
import axios from "axios";
import SuccessPopup from "../Popup/SuccessPopup";

const CreateStream = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [stream, setStream] = useState({
    start_time: "",
    end_time: "",
    url: "",
    channel_id: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStream((prevStream) => ({
      ...prevStream,
      [name]: value,
    }));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post("http://127.0.0.1:8000/streams/create", {
        stream,
      });
      setShowPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
      <h1 className="flex justify-center text-24">CREATE STREAM</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label className="mr-4">Start Time</label>
                  <input
                    type="datetime-local"
                    name="start_time"
                    value={stream.start_time}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="mr-4">End Time</label>
                  <input
                    type="datetime-local"
                    name="end_time"
                    value={stream.end_time}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                  />
                </div>

                <div className="w-[180px]">
                  <label>Channel ID</label>
                  <select
                    name="channel_id"
                    value={stream.channel_id}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                  >
                    <option value="">Select a channel</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="md:col-span-5">
                  <label>URL</label>
                  <input
                    type="text"
                    name="url"
                    value={stream.url}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
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
                      <SuccessPopup message="Tạo phiên stream thành công!" onClose={handleClosePopup} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateStream;
