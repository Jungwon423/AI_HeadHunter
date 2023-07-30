import React, { useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { setCity, selectCity } from '../slices/travelInfo'
import { useSelector, useDispatch } from 'react-redux'

interface MapboxGeocoderContainerProps {
  accessToken: string
}

const MapboxGeocoderContainer: React.FC<MapboxGeocoderContainerProps> = ({
  accessToken,
}) => {
  // Redux
  const city = useSelector(selectCity)
  const dispatch = useDispatch()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      console.log('containerRef.current', containerRef.current)
      const geocoder = new MapboxGeocoder({
        accessToken,
        placeholder: '다음 여행지는 어디로 가시나요?',
      })
      geocoder.on('result', (event) => {
        console.log('Selected place:', event.result)
        // Call your callback function here, passing the selected place as a parameter
        dispatch(setCity(event.result.place_name))
        console.log('city', city)

        const targetUrl = '/search'
        window.location.href = targetUrl
      })
      geocoder.addTo(containerRef.current)
    }
  }, [])

  return (
    <div>
      <div className="mt-8 flex justify-center items-center">
        <div ref={containerRef}></div>
      </div>
    </div>
  )
}

export default MapboxGeocoderContainer
