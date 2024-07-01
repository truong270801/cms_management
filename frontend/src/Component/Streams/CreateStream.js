import React, { useState } from "react";
import axios from "axios";
import SuccessPopup from "../Popup/SuccessPopup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateStream = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [stream, setStream] = useState({
    start_time: null,
    end_time: null,
    url: "",
    channel_id: "",
    status: "",
  });

  const handleChange = (date, name) => {
    setStream((prevStream) => {
      const updatedStream = {
        ...prevStream,
        [name]: date,
      };

      // Check and update status based on current time
      const currentTime = new Date();
      if (updatedStream.start_time && updatedStream.end_time) {
        if (currentTime >= updatedStream.start_time && currentTime <= updatedStream.end_time) {
          updatedStream.status = "active";
        } else if (currentTime < updatedStream.start_time) {
          updatedStream.status = "upcoming";
        } else if (currentTime > updatedStream.end_time) {
          updatedStream.status = "finished";
        }
      }

      return updatedStream;
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentTime = new Date();
      if (stream.start_time && stream.end_time) {
        if (currentTime >= stream.start_time && currentTime <= stream.end_time) {
          stream.status = "active";
        } else if (currentTime < stream.start_time) {
          stream.status = "upcoming";
        } else if (currentTime > stream.end_time) {
          stream.status = "finished";
        }
      }

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
                  <DatePicker
                    selected={stream.start_time}
                    onChange={(date) => handleChange(date, "start_time")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="mr-4">End Time</label>
                  <DatePicker
                    selected={stream.end_time}
                    onChange={(date) => handleChange(date, "end_time")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="h-10 border mt-1 rounded px-4 bg-gray-50"
                  />
                </div>

                <div className="w-[180px]">
                  <label>Channel ID</label>
                  <select
                    name="channel_id"
                    value={stream.channel_id}
                    onChange={(e) => handleChange(e.target.value, "channel_id")}
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
                    onChange={(e) => handleChange(e.target.value, "url")}
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
                    {showPopup && <SuccessPopup message="Tạo phiên stream thành công!" onClose={handleClosePopup} />}
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
