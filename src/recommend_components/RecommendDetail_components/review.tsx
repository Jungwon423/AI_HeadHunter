import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'
import { useState } from 'react'

const RecommendDetailReview = () => {
  const selectedPlace = useSelector(selectCurrentPlace)

  const [toggleExpanded, setToggleExpanded] = useState<any>({})

  const handleToggleClick = (index: number) => {
    setToggleExpanded((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <div className="w-3/5  bg-white shadow-md rounded-xl   hover:shadow-indigo-500/40 shadow-slate-200 my-10 ">
      <div className="px-3 pt-5 font-bold">트립어드바이저 리뷰</div>
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
  )
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are zero based
  const day = ('0' + date.getDate()).slice(-2)

  return `${year}.${month}.${day}`
}

export default RecommendDetailReview
