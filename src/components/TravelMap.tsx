import Map from 'react-map-gl'
import GeocoderControl from './geocoder-coder'
import { useState } from 'react';

const TravelMap = () => {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

    const [isContainerVisible, setIsContainerVisible] = useState(false);

    const handleButtonClick = () => {
      setIsContainerVisible(!isContainerVisible);
    };  

  return (
    <div className='flex-grow'>
      <Map
        initialViewState={{
          longitude: -79.4512,
          latitude: 43.6568,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
      </Map>
      <button className="fixed-button fixed top-0" onClick={handleButtonClick}>
        고정 버튼
      </button>
      {isContainerVisible && <div className="large-container">컨테이너 내용</div>}
    </div>
  )
}

export default TravelMap
