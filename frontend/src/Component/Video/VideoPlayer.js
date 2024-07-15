import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ url, onPlay }) => {
  const videoNode = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    
    if (playerRef.current) {
      playerRef.current.dispose();
    }

    const options = {
      fill: true,
      fluid: true,
      autoplay: false,
      controls: true,
      preload: "metadata",
      sources: [
        {
          src: url,
          type: "application/x-mpegURL",
        },
      ],
    };
    const playerInstance = videojs(videoNode.current, options);

    playerInstance.on("play", () => {
      if (onPlay) {
        onPlay(playerInstance);
      }
    });

    playerRef.current = playerInstance;

    return () => {
      if (playerRef.current) {
        playerRef.current = null;
      }
    };
  }, [url, onPlay]);

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js vjs-default-skin"></video>
    </div>
  );
};

export default VideoPlayer;
