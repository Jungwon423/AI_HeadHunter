import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'

const RecommendDetailBlog = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  return (
    <div className="w-3/5  bg-white shadow-md rounded-xl   hover:shadow-indigo-500/40 shadow-slate-200 my-10 ">
      <div className="px-3 pt-5 font-bold w-1/5">블로그</div>
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
  )
}

export default RecommendDetailBlog
