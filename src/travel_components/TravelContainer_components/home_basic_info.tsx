import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'
import { ReactImageGalleryItem } from 'react-image-gallery'
import dynamic from 'next/dynamic'

const BasicInfo = () => {
  const selectedPlace = useSelector(selectCurrentPlace)

  const imageList: ReactImageGalleryItem[] = selectedPlace!.imageList!.map(
    (image: any) => ({
      original: image,
      thumbnail: undefined,
      originalHeight: 300,
      originalWidth: 300,
    }),
  )
  const geoHierarchyList: string[] = []
  if (selectedPlace?.geoHierarchy?.country) {
    geoHierarchyList.push(selectedPlace?.geoHierarchy?.country)
  }
  if (selectedPlace?.geoHierarchy?.state) {
    geoHierarchyList.push(selectedPlace?.geoHierarchy?.state)
  }
  if (selectedPlace?.geoHierarchy?.city) {
    geoHierarchyList.push(selectedPlace?.geoHierarchy?.city)
  }
  const geoHierarchyString: String = geoHierarchyList.join(' > ')

  return (
    <div className="flex flex-col w-5/6  bg-white shadow-md rounded-xl   hover:shadow-indigo-500/40 shadow-slate-200 my-10 overflow-hidden">
      <DynamicImportedComponent items={imageList}></DynamicImportedComponent>
      <div className="px-7">
        {/* 도시 정보 */}
        {geoHierarchyString ? (
          <div
            className="flex text-start text-sm font-normal pt-10 pb-1 text-gray-500"
            style={{ color: '#0068c3' }}
          >
            {geoHierarchyString}
          </div>
        ) : null}
        {/* 이름 */}
        <div className="text-2xl font-black">
          {selectedPlace?.nameKo
            ? selectedPlace?.nameKo
            : selectedPlace?.nameEn}
        </div>
        {/* 별점 */}
        {/* {selectedPlace?.rating ? (
          <div className="flex px-2">
            <span className="text-gray-700 mt-1 mx-1 mr-2">
              {selectedPlace?.rating}
            </span>
            <StarRating rating={selectedPlace?.rating} />
            <span className="text-gray-700 mt-1 ml-1">
              ({selectedPlace?.ratingCount})
            </span>
          </div>
        ) : null} */}
        {/* 태그 */}
        <div className="flex text-gray-700 pt-1">
          <span className="mr-2">{selectedPlace?.nameEn} | </span>
          <span> </span>
          <span className="flex">
            {selectedPlace?.hashtags &&
              selectedPlace?.hashtags?.map((tag, index) => (
                <>
                  <span key={index}>{' ' + tag.nameKo + ' '} </span>
                  {selectedPlace.hashtags?.length! - 1 !== index && (
                    <span className="px-1"> {','}</span>
                  )}
                </>
              ))}
          </span>
        </div>
        {/* 한 줄 소개 */}
        <div className="py-3 text-gray-700 text-base font-normal">
          {selectedPlace?.description}
        </div>
      </div>
    </div>
  )
}

const DynamicImportedComponent = dynamic(
  () => import('react-image-gallery'),
  { ssr: false }, // This line is important. It's saying: "Only import the component on the client side"
)
export default BasicInfo
