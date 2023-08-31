import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentPlace } from '../../slices/recommendSlice'
import StarRating from '../../travel_components/StarRating'

const ContainerTitle = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  return (
    <div>
      <h2 className="flex text-start text-lg font-bold py-2 px-2">
        {selectedPlace?.name}
      </h2>
      {selectedPlace?.rating ? (
        <div className="flex px-2">
          <span className="text-gray-700 mt-1 mx-1 mr-2">
            {selectedPlace?.rating}
          </span>
          <StarRating rating={selectedPlace?.rating} />
          <span className="text-gray-700 mt-1 ml-1">
            ({selectedPlace?.ratingCount})
          </span>
        </div>
      ) : null}
      <div className="flex text-gray-500 px-2 pt-1">
        <div>
          {selectedPlace?.hashtags &&
            selectedPlace?.hashtags?.map((tag, index) => (
              <span key={index}>#{tag.nameKo} </span>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ContainerTitle
