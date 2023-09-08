import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'
import YouTube from 'react-youtube'

const RecommendDetailYoutube = () => {
  const selectedPlace = useSelector(selectCurrentPlace)

  const [toggleExpanded, setToggleExpanded] = useState<any>({})
  const [showVideo, setShowVideo] = useState<any>({})

  const handleToggleClick = (index: number) => {
    setToggleExpanded((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }
  const handleThumbnailClick = (index: number) => {
    setShowVideo((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <div className="w-3/5  bg-white shadow-md rounded-xl   hover:shadow-indigo-500/40 shadow-slate-200 my-10 ">
      <div className="px-3 pt-5 font-bold">유투브</div>
      {selectedPlace?.youtube ? (
        selectedPlace?.youtube?.map((youtube, index) => (
          <>
            <div key={index} className="flex flex-row">
              <div
                className="p-3 relative cursor-pointer basis-1/3"
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={youtube.thumbnails[0]}
                  alt={`Profile of `}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
                <div className="text-xs absolute bottom-3 left-5">
                  <img
                    src="/assets/youtube2.png"
                    alt={`Profile of `}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="text-xs font-bold text-white absolute bottom-3 right-5">
                  {youtube.duration}
                </div>
              </div>
              <div className="flex flex-col p-3 basis-2/3">
                <div
                  className="cursor-pointer text-sm font-bold text-indigo-400 line-clamp-2"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/${youtube.url_suffix}`,
                      '_blank',
                    )
                  }
                >
                  {youtube.title}
                </div>
                <div className="pt-2 text-xs flex flex-row text-gray-600">
                  <div className="text-[10px]">{youtube.channel}</div>
                  <div className="px-1 font-bold text-[10px] text-gray-800">
                    ·
                  </div>
                  <div className="text-[10px] flex w-14">
                    {youtube.publish_time}
                  </div>
                </div>
              </div>
            </div>

            {showVideo[index] && (
              <div className="flex justify-center">
                <YouTube
                  className="p-2"
                  videoId={youtube.id}
                  opts={{
                    width: '350',
                    height: '270',
                    playerVars: {
                      autoplay: 0, // 자동재생
                      modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                    },
                  }}
                  //이벤트 리스너
                  onEnd={(e) => {
                    e.target.stopVideo(0)
                  }}
                ></YouTube>
              </div>
            )}
            <div className="border-t border-gray-400 w-full"> </div>
          </>
        ))
      ) : (
        <div className="p-3">유투브 정보 추가 중입니다...</div>
      )}
    </div>
  )
}

export default RecommendDetailYoutube
