import React, { useEffect, useState } from "react";
import DeleteStream from "./DeleteStream";
import NavbarTop from "../../Component/Navbar/NavbarTop";
import NavbarLeft from "../../Component/Navbar/NavbarLeft";
import Popup from "../../Component/Popup/Popup";
import { tableStream } from "../../Service/Stream_Service";
import { useNavigate } from "react-router-dom";


const TableStream = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("start_time");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchVideoID, setSearchVideoID] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stream = await tableStream();
        if (stream && stream.length > 0) {
          setData(stream);
          setError(null);
        } else {
          setData(null);
          setError("KHÔNG CÓ DỮ LIỆU!");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setShowPopup(true);
        } else {
          setError("Đã xảy ra lỗi khi lấy danh sách stream.");
        }
      }
    };

    fetchData();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddStream = () => {
    navigate("/addstream");
  };

  const getStatus = (start_time, end_time) => {
    const currentTime = new Date();
    const startTime = new Date(start_time);
    const endTime = new Date(end_time);

    if (startTime <= currentTime && endTime >= currentTime) {
      return "active";
    } else if (startTime > currentTime) {
      return "inactive";
    }
  };

  const handleStreamDeleted = (streamId) => {
    setData(data.filter((stream) => stream.ID !== streamId));
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
    if (!Array.isArray(data)) {

      return null;
    }
    let filteredData = [...data];

    if (selectedStatus !== "All") {
      filteredData = filteredData.filter(
        (stream) => getStatus(stream.StartAt, stream.EndAt) === selectedStatus
      );
    }

    if (searchVideoID.trim() !== "") {
      filteredData = filteredData.filter((stream) => {
        return (
          stream.VideoID &&
          stream.VideoID.toString()
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
      <tr key={stream.ID}>
        <td className="text-left py-3 px-4">{stream.ID}</td>
        <td className="text-left py-3 px-4">{stream.PlayURL}</td>
        <td className="text-left py-3 px-4">
          {renderFormattedDateTime(stream.StartAt)}
        </td>
        <td className="text-left py-3 px-4">
          {renderFormattedDateTime(stream.EndAt)}
        </td>
        <td className="text-left py-3 px-4">{stream.VideoID}</td>
        <td className="text-left py-3 px-4">
          {getStatus(stream.StartAt, stream.EndAt)}
        </td>
        <td className="text-left py-3 px-4 flex flex-row">

              <DeleteStream

                streamId={stream.ID}
                onStreamDeleted={handleStreamDeleted}
              />
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
          <h1 className="text-2xl font-bold">DANH SÁCH STREAM</h1>
        </div>
        <div className="flex justify-between space-x-4 mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-4 py-2 w-[400px] border rounded-md w-100 "
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
              className="px-4 py-2 mr-4 border rounded-md cursor-pointer"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="inactive">inactive</option>
              <option value="active">active</option>

            </select>
            <label className="text-[16px] ">Thời gian bắt đầu:</label>
            <select
              name="sortBy"
              className="px-4 py-2 border rounded-md cursor-pointer"
              value={`${sortBy}:${sortOrder}`}
              onChange={handleSortChange}
            >
              <option value="StartAt:asc">tăng dần</option>
              <option value="StartAt:desc">giảm dần</option>
            </select>

            <button
              className="w-[100px] h-[40px] bg-[#335bdf] text-white ml-4 rounded-md hover:bg-[#274481]"
              onClick={handleAddStream}>
              Tạo stream
            </button>
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
                  VIDEO ID
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
          </table>
          {error && <p className="text-red-500 text-[24px] font-bold flex flex-col items-center mt-10">{error}</p>}
          {showPopup && (
            <Popup
              message="Bạn không có quyền thực hiện thao tác này."
              onClose={handleClosePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TableStream;
