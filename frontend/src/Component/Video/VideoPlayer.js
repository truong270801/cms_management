import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ url, onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
    }

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('play', () => {
        if (onPlay) {
          onPlay(videoElement);
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (videoElement) {
        videoElement.removeEventListener('play', () => {
          if (onPlay) {
            onPlay(videoElement);
          }
        });
      }
    };
  }, [url, onPlay]);

  return <video ref={videoRef} controls className="video-js vjs-default-skin"></video>;
};

export default VideoPlayer;
