import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateStream = ({ stream, onStreamUpdate, onClose }) => {
  const [streamData, setStreamData] = useState({
    start_time: null,
    end_time: null,
    url: '',
    channel_id: '',
    status: '',
  });

  useEffect(() => {
    if (stream) {
      setStreamData({
        start_time: stream.start_time ? new Date(stream.start_time) : null,
        end_time: stream.end_time ? new Date(stream.end_time) : null,
        url: stream.url || '',
        channel_id: stream.channel_id || '',
        status: stream.status || '',
      });
    }
  }, [stream]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStreamData((prevStream) => ({
      ...prevStream,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setStreamData((prevStream) => ({
      ...prevStream,
      [name]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/streams/${stream.id}`,
        { stream: streamData }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      onStreamUpdate(response.data.stream);
      
      onClose();
      //alert('Successfully');
    } catch (error) {
      console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white w-[80%] max-w-lg mx-auto rounded-lg p-8 z-50">
        <h1 className="flex justify-center text-24">UPDATE STREAM</h1>
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label className="mr-4">Start Time</label>
                    <DatePicker
                      selected={streamData.start_time}
                      onChange={(date) => handleDateChange(date, 'start_time')}
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
                      selected={streamData.end_time}
                      onChange={(date) => handleDateChange(date, 'end_time')}
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
                      value={streamData.channel_id}
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
                      value={streamData.url}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="w-[150px] sm:col-span-5">
                    <label>Status</label>
                    <select
                      name="status"
                      value={streamData.status}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Select a status</option>
                      <option className="text-[#09D300]" value="active">
                        Active
                      </option>
                      <option className="text-blue-500" value="upcoming">
                        Upcoming
                      </option>
                      <option className="text-red-500" value="finished">
                        Finished
                      </option>
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

export default UpdateStream;
