import React, { useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import styles from './MapboxGeocoderContainer.module.css'

interface MapboxGeocoderContainerProps {
  accessToken: string
}

const MapboxGeocoderContainer: React.FC<MapboxGeocoderContainerProps> = ({
  accessToken,
}) => {
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
        const targetUrl = '/search'
        window.location.href = targetUrl
      })
      geocoder.addTo(containerRef.current)
    }
  }, [])

  return (
    <div>
      <div className="mt-8 flex justify-center items-center w-2/3">
        <div ref={containerRef} className="w-96 !important"></div>
        <button className={'test-css'}> 클릭하세요 </button>
      </div>
      <style jsx>
        {`
          .mapboxgl-ctrl-geocoder.mapboxgl-ctrl {
            min-width: 400px;
            background-color: red;
          }
          .test-css {
            background-color: red;
          }
          .mapboxgl-ctrl-geocoder--input {
            width: 400px;
          }
          .mapboxgl-ctrl-geocoder {
    width: 1000px !important;
}
        `}
      </style>
    </div>
  )
}

export default MapboxGeocoderContainer
