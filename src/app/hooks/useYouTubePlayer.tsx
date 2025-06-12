//@ts-nocheck
"use client"

import { useCallback, useEffect, useRef, useState } from "react";

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const useYouTubePlayer = (videoId: string, elementId, startTime = 200, interval = 5000) => {
  const playerElementId = elementId || "video-player";
  const playerRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    isReady: false,
    currentTime: 0,
    videoData: {
      title: '',
    },
    videoStateLabel: '',
    videoStatevalue: -10
  });

  // Load YouTube Iframe API script
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];

    if (firstScriptTag?.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube is ready to roll");
      const videoOptions = {
        height: '390',
        width: '640',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'start': startTime,
        },
        events: {
          'onReady': handleOnReady,
          'onStateChange': handleOnStateChange
        }
      };
      playerRef.current = new window.YT.Player(playerElementId, videoOptions);
    };
  }, [videoId]);

  // Polling every few seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Triggering manual update");
      handleOnStateChange(); // Call without event
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleOnReady = useCallback((event) => {
    setPlayerState(prev => ({ ...prev, isReady: true }));
    handleOnStateChange(); // trigger initial data fetch
  }, []);

  const handleOnStateChange = useCallback((event) => {
    if (!playerRef.current) return;

    const YTPlayerStateObj = window.YT?.PlayerState || {};

    const videoData = playerRef.current.getVideoData?.() || {};
    const currentTime = playerRef.current.getCurrentTime?.() || 0;

    // Safe fallback if event is undefined (like in setInterval or onReady)
    const videoStatevalue = event?.data ?? playerRef.current.getPlayerState?.() ?? -1;
    const videoStateLabel = getKeyByValue(YTPlayerStateObj, videoStatevalue);

    setPlayerState(prevState => ({
      ...prevState,
      videoData,
      currentTime,
      videoStateLabel,
      videoStatevalue
    }));
  }, []);

  return playerState;
};

export default useYouTubePlayer;
