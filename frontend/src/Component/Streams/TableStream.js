import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteStream from "./DeleteStream";
import UpdateStream from "./UpdateStream";

const TableStream = () => {
  const [data, setData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/streams");
        setData(response.data.stream);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const handleStreamUpdated = (updatedStream) => {
    setData(
      data.map((stream) =>
        stream.id === updatedStream.id ? updatedStream : stream
      )
    );
  };

  const handleStreamDeleted = (streamId) => {
    setData(data.filter((stream) => stream.id !== streamId));
  };

  const handleEditClick = (stream) => {
    setSelectedStream(stream);
    setShowUpdateModal(true);
  };

  const renderTableRows = () => {
    let filteredData = data;

    if (selectedStatus !== "All") {
      filteredData = data.filter((stream) => stream.status === selectedStatus);
    }

    return filteredData.map((stream) => (
      <tr key={stream.id}>
        <td className="text-left py-3 px-4">{stream.id}</td>
        <td className="text-left py-3 px-4">{stream.url}</td>
        <td className="text-left py-3 px-4">{stream.start_time}</td>
        <td className="text-left py-3 px-4">{stream.end_time}</td>
        <td className="text-left py-3 px-4">{stream.channel_id}</td>
        <td className="text-left py-3 px-4">{stream.status}</td>
        <td className="text-left py-3 px-4 flex flex-row">
          <span
            className="material-icons text-gray-600 cursor-pointer"
            onClick={() => handleEditClick(stream)}
          >
            edit
          </span>
          <DeleteStream
            streamId={stream.id}
            onStreamDeleted={handleStreamDeleted}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
      <div className="flex justify-between items-center">
        <div> </div>
        <h1 className="text-2xl font-bold">LIST STREAM</h1>
        <div>
          <select
            name="status"
            className="px-4 py-2 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <table className="min-w-full bg-white mt-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                URL
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                START TIME
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                END TIME
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                CHANNEL ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                STATUS
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">{renderTableRows()}</tbody>
        </table>
      </div>
      {showUpdateModal && selectedStream && (
        <UpdateStream
          stream={selectedStream}
          onStreamUpdate={(updatedStream) => {
            handleStreamUpdated(updatedStream);
            setShowUpdateModal(false);
          }}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default TableStream;
