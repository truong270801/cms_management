import React, { useEffect, useState, useRef, useCallback } from "react";
import VideoPlayer from "../../Component/Video/VideoPlayer";
import NavbarTop from "../../Component/Navbar/NavbarTop";
import NavbarLeft from "../../Component/Navbar/NavbarLeft";
import Popup from "../../Component/Popup/Popup";
import { tableStream } from "../../Service/Stream_Service";

const MonitorStream = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [livestreams, setLivestreams] = useState([]);
  const [sortBy, setSortBy] = useState("start_time");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchVideoID, setSearchVideoID] = useState("");
  const currentPlayingRef = useRef(null);
  const [error, setError] = useState("");
  const [upcomingError, setUpcomingError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stream = await tableStream();
        if (stream && stream.length > 0) {
          setLivestreams(stream);
          setError(null);
          setUpcomingError("CÓ LIVESTREAM SẮP DIỄN RA.");
        } else {
          setLivestreams(null);
          setError("KHÔNG CÓ DỮ LIỆU!");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setShowPopup(true);
        } else {
          setError("Đã xảy ra lỗi khi lấy dữ liệu.");
        }
      }
    };

    fetchData();

  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const activeLivestreams = livestreams ? livestreams.filter((stream) => {
    const now = new Date();
    const startTime = new Date(stream.StartAt);
    const endTime = new Date(stream.EndAt);
    return startTime <= now && now <= endTime;
  }) : [];

  const upcomingLivestreams = livestreams ? livestreams.filter((stream) => {
    const now = new Date();
    const startTime = new Date(stream.StartAt);
    return startTime > now;
  }) : [];

  let filteredLivestreams = [...activeLivestreams];
  if (searchVideoID.trim() !== "") {
    filteredLivestreams = filteredLivestreams.filter((stream) =>
      stream.VideoID.toString().toLowerCase().includes(searchVideoID.toLowerCase())
    );
  }

  filteredLivestreams.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a[sortBy]) - new Date(b[sortBy]);
    } else {
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    }
  });

  const handlePlay = useCallback((playerInstance) => {
    if (
      currentPlayingRef.current &&
      currentPlayingRef.current !== playerInstance
    ) {
      currentPlayingRef.current.pause();
    }
    currentPlayingRef.current = playerInstance;
  }, []);


  const renderFormattedDateTime = useCallback((dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }, []);

  const renderLivestreamCards = () => {

    return filteredLivestreams.map((stream) => (
      <div
        key={stream.ID}
        className="border rounded-lg p-4 mb-4 w-[390px] h-[350px] mr-4"
      >
        <div className="flex justify-between items-center mb-2">
          <VideoPlayer url={stream.PlayURL} onPlay={handlePlay} />
        </div>
        <h2 className="text-[18px] text-[#3C8DBC] mb-1 font-bold underline">
          VideoID: {stream.VideoID}
        </h2>
        <p className="text-sm text-gray-600 mb-1">
          Thời gian bắt đầu: {renderFormattedDateTime(stream.StartAt)}
        </p>
        <p className="text-sm text-gray-600">
          Thời gian kết thúc: {renderFormattedDateTime(stream.EndAt)}
        </p>
      </div>
    ));
  };

  return (
    <div>
      <NavbarTop />
      <NavbarLeft />

      <div className="absolute top-12 left-48 w-[calc(100%-12rem)] h-[calc(100%-3rem)] bg-white p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">MÀN HÌNH STREAM</h1>
        </div>
        <div className="flex justify-between space-x-4 mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
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
            <label className="text-[16px]">Thời gian bắt đầu:</label>
            <select
              name="sortBy"
              className="px-4 py-2 border rounded-md cursor-pointer"
              value={`${sortBy}:${sortOrder}`}
              onChange={(e) => {
                const [sortByField, sortOrderField] = e.target.value.split(":");
                setSortBy(sortByField);
                setSortOrder(sortOrderField);
              }}
            >
              <option value="StartAt:asc">tăng dần</option>
              <option value="StartAt:desc">giảm dần</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap mt-8">{renderLivestreamCards()}</div>
        {upcomingLivestreams.length > 0 && (<p className="text-red-500 text-[24px] font-bold flex flex-col items-center mt-10">
          {upcomingError}
        </p>
        )}
        {error && <p className="text-red-500 text-[24px] font-bold flex flex-col items-center mt-10">{error}</p>}
        {showPopup && (
          <Popup
            message="Bạn không có quyền thực hiện thao tác này."
            onClose={handleClosePopup}
          />
        )}
      </div>

    </div>
  );
};

export default MonitorStream;
