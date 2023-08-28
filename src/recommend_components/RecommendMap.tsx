import { useSelector } from 'react-redux'
import { selectShowChat, setShowChat } from '../slices/travelChatSlice'
import { useDispatch } from 'react-redux'

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapRef,
} from 'react-map-gl'
import TravelChat from '../travel_components/TravelChat'
import {
  selectCoordinate,
  selectCurrentPlace,
  handleCurrentPlace,
  selectAttractions,
  selectRestaurants,
  selectDepreactedAttractions,
  selectDepreactedRestaurants,
  selectRecommendState,
} from '../slices/recommendSlice'
import { PlaceInfo } from '../interfaces/placeInfo'
import ChatScreen from '../travel_components/ChatScreen'
import { useCallback, useEffect, useRef, useState } from 'react'
import { selectRecommendSchedule } from '../slices/travelInfoSlice'
import PrettyPin from '../components/PrettyPin'

const RecommendMap = () => {
  const showChat = useSelector(selectShowChat)

  const dispatch = useDispatch()

  const selectedPlace = useSelector(selectCurrentPlace)

  const attractions: PlaceInfo[] = useSelector(selectAttractions).reduce(
    (acc, val) => acc.concat(val),
    [],
  )
  const restaurant: PlaceInfo[] = useSelector(selectRestaurants).reduce(
    (acc, val) => acc.concat(val),
    [],
  )
  const deprecatedAttractions: PlaceInfo[] = useSelector(
    selectDepreactedAttractions,
  )
  const deprecatedRestaurants: PlaceInfo[] = useSelector(
    selectDepreactedRestaurants,
  )

  const recommendState = useSelector(selectRecommendState)

  const places = (recommendState: any) => {
    if (recommendState === '전체') {
      // return attractions
      //   .concat(restaurant)
      //   .concat(deprecatedAttractions)
      //   .concat(deprecatedRestaurants)
      return attractions.concat(deprecatedAttractions)
    } else if (recommendState === '추천') {
      // return attractions.concat(restaurant)
      return attractions
    } else {
      // return deprecatedAttractions.concat(deprecatedRestaurants)
      return deprecatedAttractions
    }
  }

  const travelSchedule: PlaceInfo[][] =
    useSelector(selectRecommendSchedule) || []

  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const coordinate = useSelector(selectCoordinate)

  const [viewState, setViewState] = useState({
    longitude: coordinate[0], //130 어쩌구
    latitude: coordinate[1],
    zoom: 11.7,
  })

  useEffect(() => {
    if (
      selectedPlace?.coordinate !== undefined &&
      selectedPlace?.coordinate !== null
    ) {
      onSelectCity({
        longitude: selectedPlace?.coordinate![1],
        latitude: selectedPlace?.coordinate![0],
      })
    }
  }, [selectedPlace])

  const mapRef = useRef<MapRef | null>(null)

  const onSelectCity = useCallback(
    ({ longitude, latitude }: { longitude: number; latitude: number }) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: 16,
      })
    },
    [],
  )

  return (
    <div className="flex">
      <TravelChat></TravelChat>
      <Map
        ref={mapRef}
        style={{ width: '100vw', height: '100vh' }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/zigdeal/clkjl2a7y001401r27iv81iw2"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {places(recommendState).map((place, j) => (
          <Marker
            key={j + 10}
            latitude={place.coordinate![0]}
            longitude={place.coordinate![1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              dispatch(handleCurrentPlace(place))
            }}
          >
            <PrettyPin></PrettyPin>
          </Marker>
        ))}
        {selectedPlace && selectedPlace.coordinate && (
          <Popup
            className="flex bg-white shadow-md rounded-xl cursor-pointer hover:shadow-indigo-500/40 shadow-slate-200"
            anchor="top"
            latitude={selectedPlace.coordinate[0]}
            longitude={selectedPlace.coordinate[1]}
            onClose={() => {
              dispatch(handleCurrentPlace(selectedPlace))
            }}
          >
            <div>{selectedPlace.name}</div>
            <div>{selectedPlace.description}</div>
            <div>{selectedPlace.time}</div>
            {/* <div>{selectedPlace.summary}</div> */}

            <div>{selectedPlace.rating}</div>
            <div>{selectedPlace.ratingCount}</div>
            <div>{selectedPlace.hashtags}</div>
            <div>{selectedPlace.phoneNumber}</div>
            <div>{selectedPlace.location}</div>
            <div>{selectedPlace.googleUrl}</div>
            <div>{selectedPlace.website}</div>
            {/* <div>{selectedPlace.openingHours}</div>
            <div>{selectedPlace.reviews}</div> */}
          </Popup>
        )}
      </Map>
      {showChat && <ChatScreen onClose={() => dispatch(setShowChat(false))} />}
    </div>
  )
}

export default RecommendMap
