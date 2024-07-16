import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteStream from "./DeleteStream";
import NavbarTop from "../../Component/Navbar/NavbarTop";
import NavbarLeft from "../../Component/Navbar/NavbarLeft";
import Popup from "../../Component/Popup/Popup";

const TableStream = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("start_time");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchVideoID, setSearchVideoID] = useState("");
  const [showPopup, setShowPopup] = useState(false);


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
      }catch (error) {
        if (error.response.status === 403) {
          setShowPopup(true);
        } else {
          alert("Đã xảy ra lỗi khi tạo luồng, vui lòng đăng nhập lại!");
        }
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
  
  };
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
        (stream) =>
          getStatus(stream.start_time, stream.end_time) === selectedStatus
      );
    }

    if (searchVideoID.trim() !== "") {
      filteredData = filteredData.filter((stream) => {
        return (
          stream.id &&
          stream.id
            .toString()
            .toLowerCase()
            .includes(searchVideoID.toLowerCase())
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
        <td className="text-left py-3 px-4">
          {renderFormattedDateTime(stream.start_time)}
        </td>
        <td className="text-left py-3 px-4">
          {renderFormattedDateTime(stream.end_time)}
        </td>
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
    <div>
      <NavbarTop />
      <NavbarLeft />
      <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold ">DANH SÁCH STREAM</h1>
        </div>
        <div className="flex justify-between space-x-4 mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm ..."
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
              <option value="All">Tất cả</option>
              <option value="upcoming">Sắp diễn ra</option>
              <option value="active">Đang diễn ra</option>
              <option value="finished">Kết thúc</option>
            </select>
            <label className="text-[16px]">Giờ bắt đầu:</label>
            <select
              name="sortBy"
              className="px-4 py-2 border rounded-md"
              value={`${sortBy}:${sortOrder}`}
              onChange={handleSortChange}
            >
              <option value="start_time:asc">Tăng dần</option>

              <option value="start_time:desc">Giảm dần</option>
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
                THỜI GIAN BẮT ĐẦU
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  THỜI GIAN KẾT THÚC
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  CHANNEL ID
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  TRẠNG THÁI
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">{renderTableRows()}</tbody>
            {showPopup && (
                        <Popup
                          message="Bạn không có quyền thực hiện thao tác này."
                          onClose={handleClosePopup}
                        />
                      )}
          </table>
        </div>
      </div>

    </div>
  );
};

export default TableStream;
