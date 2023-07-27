import Map from 'react-map-gl'
import GeocoderControl from './geocoder-coder'
import ControlPanel from './control-panel'

const TravelMap = () => {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtqbDF2N3MwcHJ5M3FucjdqdzhpaWlnIn0.XMJC6lSrpUxqUutc61sK8g'

  return (
    <div className="flex-grow">
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
      <ControlPanel />
    </div>
  )
}

export default TravelMap
