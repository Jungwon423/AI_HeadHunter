import { ReactImageGalleryItem } from 'react-image-gallery'
import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'
import BasicInfo from './home_basic_info'
import TripAdviser from './home_tripadvisor'

const RecommendDetailHome = () => {
  const selectedPlace = useSelector(selectCurrentPlace)

  console.log(selectedPlace)

  const imageList: ReactImageGalleryItem[] = selectedPlace!.imageList!.map(
    (image: any) => ({
      original: image,
      thumbnail: undefined,
      originalHeight: 300,
      originalWidth: 300,
    }),
  )

  return (
    <>
      <BasicInfo></BasicInfo>
      <TripAdviser></TripAdviser>
    </>
  )
}

export default RecommendDetailHome
