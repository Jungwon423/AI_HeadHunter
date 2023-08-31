import Image from 'next/legacy/image'
import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../slices/recommendSlice'
import GuideTab from '../travel_components/ReviewTab'
import GoogleButton from '../travel_components/GoogleButton'
import { selectCurrentTabIndex } from '../slices/tabSlice'
import CloseButton from '../travel_components/container_components/CloseButton'

import ContainerTitle from './detail_components/ContainerTitle'
import Recommend from '../travel_components/container_components/Recommend'
import Location from '../travel_components/container_components/Location'
import OperationHours from '../travel_components/container_components/OperationHours'
import Website from '../travel_components/container_components/Website'
import PhoneNumber from '../travel_components/container_components/PhoneNumber'
import YouTube from 'react-youtube'
import { useState } from 'react'

const RecommmendDetail = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  let currentReviewTab = useSelector(selectCurrentTabIndex)

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are zero based
    const day = ('0' + date.getDate()).slice(-2)

    return `${year}.${month}.${day}`
  }

  if (!selectedPlace || !selectedPlace?.coordinate) {
    return <div className="w-96 rounded-none hidden z-10"></div>
  }
  return (
    <div className="w-96 flex-col overflow-y-auto relative">
      <CloseButton />
      <div className="w-full">
        <Image
          src={selectedPlace?.image!}
          alt={selectedPlace?.name! ?? ''}
          width={384}
          height={280}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="w-full h-16 flex-col">
        <ContainerTitle></ContainerTitle>
        <div className="p-3 text-gray-700">{selectedPlace?.description}</div>
        <div className="h-3 bg-gray-300 w-full"> </div>
        <Recommend></Recommend>

        {selectedPlace?.googleUrl ? (
          <GoogleButton url={selectedPlace?.googleUrl}></GoogleButton>
        ) : null}
        <GuideTab></GuideTab>
        {currentReviewTab === 0 ? (
          <div>
            <Location></Location>
            <OperationHours></OperationHours>
            <Website></Website>
            <PhoneNumber></PhoneNumber>
          </div>
        ) : null}
        {currentReviewTab === 1 ? (
          <div>
            <div className="px-3 pt-5 font-bold">리뷰</div>
            {selectedPlace?.reviews ? (
              selectedPlace?.reviews?.map((review, index) => (
                <div key={index}>
                  <div className="flex flex-col justify-center p-3">
                    <div className="text-sm text-gray-800">{review.author}</div>
                    <div className="flex flex-row">
                      <i
                        key={review.rating}
                        className="pr-1 bi bi-star-fill text-yellow-400 text-sm"
                      ></i>
                      <div className="text-sm font-bold"> {review.rating}</div>
                      <div className="text-sm text-gray-600">/5 </div>

                      <div className="text-gray-700 pt-0.5 pl-3 text-xs">
                        {formatDate(review.datePublished)}
                      </div>
                    </div>
                    <div className=" border-1  border-gray-800 pt-3 font-bold text-sm text-gray-700">
                      {review.title}
                    </div>
                    <div className="pt-1 text-xs leading-5 flex items-end">
                      <div
                        className={`line-clamp-3 ${
                          toggleExpanded[index] ? 'line-clamp-none' : ''
                        }`}
                      >
                        {review.description_kr}
                      </div>

                      {review.description_kr.split(' ').length > 18 && (
                        <button onClick={() => handleToggleClick(index)}>
                          {toggleExpanded[index] ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-2 h-3 ml-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 15.75l7.5-7.5 7.5 7.5"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-2 h-3 ml-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    <div>{review.moreReviewURL}</div>
                  </div>
                  <div className="border-t border-gray-400 w-full"> </div>
                </div>
              ))
            ) : (
              <div className="p-3">리뷰가 없습니다.</div>
            )}
          </div>
        ) : null}
        {currentReviewTab === 2 ? (
          <div>
            <div className="px-3 pt-5 font-bold">블로그</div>
            {selectedPlace?.naverBlog ? (
              selectedPlace?.naverBlog?.map((blog, index) => (
                <div key={index}>
                  <div className="flex flex-col p-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.title }}
                      onClick={() => window.open(blog.link, '_blank')}
                      className="mb-1 cursor-pointer text-sm text-indigo-500 line-clamp-1"
                    ></div>
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                      className="text-gray-800 my-1 text-xs line-clamp-2 leading-5"
                    ></div>
                    <div className="flex flex-row text-xs text-gray-800">
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          window.open(`https://${blog.bloggerlink}`, '_blank')
                        }
                      >
                        {blog.bloggername}
                      </div>
                      <div className="px-3"> | </div>
                      <div className="">{blog.postdate}</div>
                    </div>
                  </div>
                  <div className="border-t border-gray-400 w-full"> </div>
                </div>
              ))
            ) : (
              <div className="p-3">블로그 정보 추가 중입니다...</div>
            )}
          </div>
        ) : null}
        {currentReviewTab === 3 ? (
          <div>
            <div className="px-3 pt-5 font-bold">유투브</div>
            {selectedPlace?.youtube ? (
              selectedPlace?.youtube?.map((youtube, index) => (
                <>
                  <div key={index} className="flex flex-row">
                    <div
                      className="p-3 relative cursor-pointer"
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img
                        src={youtube.thumbnails[0]}
                        alt={`Profile of `}
                        width={150}
                        height={150}
                        className="rounded-lg"
                      />
                      <div className="text-xs absolute bottom-3 left-5">
                        <img
                          src="/assets/youtube2.png"
                          alt={`Profile of `}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="text-xs font-bold text-white absolute bottom-3 right-5">
                        {youtube.duration}
                      </div>
                    </div>
                    <div className="flex flex-col p-3 w-[270px]">
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
        ) : null}
      </div>
    </div>
  )
}

export default RecommmendDetail
