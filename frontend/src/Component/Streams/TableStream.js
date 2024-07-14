import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteStream from "./DeleteStream";

const TableStream = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("start_time");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchVideoID, setSearchVideoID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/streams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.stream);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const getStatus = (start_time, end_time) => {
    const currentTime = new Date();
    const startTime = new Date(start_time);
    const endTime = new Date(end_time);

    if (startTime <= currentTime && endTime >= currentTime) {
      return "active";
    } else if (startTime > currentTime) {
      return "upcoming";
    } else if (endTime < currentTime) {
      return "finished";
    }
    return "unknown";
  };

  const handleStreamDeleted = (streamId) => {
    setData(data.filter((stream) => stream.id !== streamId));
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [sortByField, sortOrderField] = value.split(":");
    setSortBy(sortByField);
    setSortOrder(sortOrderField);
  };

  const renderFormattedDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderTableRows = () => {
    let filteredData = [...data];

    if (selectedStatus !== "All") {
      filteredData = filteredData.filter(
        (stream) => getStatus(stream.start_time, stream.end_time) === selectedStatus
      );
    }

    if (searchVideoID.trim() !== "") {
      filteredData = filteredData.filter((stream) => {
        // Kiểm tra xem stream.id tồn tại trước khi so sánh
        return (
          stream.id &&
          stream.id.toString().toLowerCase().includes(searchVideoID.toLowerCase())
        );
      });
    }

    filteredData.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a[sortBy]) - new Date(b[sortBy]);
      } else {
        return new Date(b[sortBy]) - new Date(a[sortBy]);
      }
    });

    return filteredData.map((stream) => (
      <tr key={stream.id}>
        <td className="text-left py-3 px-4">{stream.id}</td>
        <td className="text-left py-3 px-4">{stream.url}</td>
        <td className="text-left py-3 px-4">{renderFormattedDateTime(stream.start_time)}</td>
        <td className="text-left py-3 px-4">{renderFormattedDateTime(stream.end_time)}</td>
        <td className="text-left py-3 px-4">{stream.channel_id}</td>
        <td className="text-left py-3 px-4">
          {getStatus(stream.start_time, stream.end_time)}
        </td>
        <td className="text-left py-3 px-4 flex flex-row">
          {["active", "upcoming"].includes(
            getStatus(stream.start_time, stream.end_time)
          ) && (
            <DeleteStream
              streamId={stream.id}
              onStreamDeleted={handleStreamDeleted}
            />
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold ">LIST STREAM</h1>
      </div>
      <div className="flex justify-between space-x-4 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search VideoID"
            className="px-4 py-2 w-[400px] border rounded-md w-100"
            value={searchVideoID}
            onChange={(e) => setSearchVideoID(e.target.value)}
          />
          {searchVideoID && (
            <button
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
              onClick={() => setSearchVideoID("")}
            >
              <span className="material-icons">close</span>
            </button>
          )}
        </div>
        <div>
          <select
            name="status"
            className="px-4 py-2 mr-4 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="finished">Finished</option>
          </select>
          <label className="text-[16px]">Start Time:</label>
          <select
            name="sortBy"
            className="px-4 py-2 border rounded-md"
            value={`${sortBy}:${sortOrder}`}
            onChange={handleSortChange}
          >
            <option value="start_time:asc">High</option>

            <option value="start_time:desc">Low</option>
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
    </div>
  );
};

export default TableStream;
