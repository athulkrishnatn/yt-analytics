//@ts-nocheck
"use client"

import extractYouTubeInfo from "@/lib/extractYouTubeInfo"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function YouTubeUrlForm() {
  const [url, setUrl] = useState('')
  const [videoData, setVideoData] = useState({
    videoId: '',
    time: 0,
  })

  const handleSubmit = (event) => {
    event.preventDefault()
        if(!videoData.videoId){
            alert("Needs a video ID")
        }else{
            redirect(`/watch?v=${videoData.videoId}&t=${videoData.time}`)

        }
  }

  const handleUrlChange = (event) => {
    const changedUrl = event.target.value || ''
    setUrl(changedUrl)

    const { videoId, time } = extractYouTubeInfo(changedUrl)
    setVideoData({ videoId, time: time || 0 })
  }

  return (
    <form onSubmit={handleSubmit} >
        <div className="w-[600px]">
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 shadow-md border">
          <input
            id="url"
            name="url"
            type="text"
            onChange={handleUrlChange}
            required
            value={url}
            placeholder="Enter your youtube URL here....."
            className="block outline-none min-w-0 grow py-1.5 pr-3 pl-1 text-base text-black placeholder:text-gray-400 sm:text-sm/6"
          />
          <button type="submit" className="text-white cursor-pointer font-semibold bg-red-600 py-3 px-5 rounded-md">
            Play
          </button>
        </div>
      </div>
      <div className="text-black">
        {videoData && JSON.stringify(videoData)}
      </div>
    </div>
    </form>
  )
}
