import {
  selectTravelSchedule,
  selectCoordinate,
  selectCurrentPlace,
  selectCurrentDay,
  handleCurrentPlace,
} from '../slices/travelInfoSlice'
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
  Source,
  Layer,
  MapRef,
} from 'react-map-gl'
import ChatScreen from './ChatScreen'
import Pin from './Pin'
import TravelChat from './TravelChat'
import { PlaceInfo } from '../interfaces/placeInfo'
import { useCallback, useEffect, useRef, useState } from 'react'
import polyline from '@mapbox/polyline'
import PrettyPin from '../components/PrettyPin'
import NaverPin from '../components/NaverPin'
import { current } from '@reduxjs/toolkit'

import { motion } from 'framer-motion'

const TravelMap = () => {
  const showChat = useSelector(selectShowChat)

  const dispatch = useDispatch()

  const selectedPlace = useSelector(selectCurrentPlace)
  const currentDay: number = useSelector(selectCurrentDay)

  const travelSchedule: PlaceInfo[][] = useSelector(selectTravelSchedule) || []
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const coordinate = useSelector(selectCoordinate)
  // interface RouteGeoJSON {
  //   type: string
  //   properties: {}
  //   geometry: {
  //     type: string
  //     coordinates: number[][]
  //   }
  // }

  // 좌표들을 세미콜론으로 구분된 문자열 형식으로 변경
  // const convertCoordinatesToString = (coordinates: number[][]) => {
  //   return coordinates.map((coordinate) => coordinate.join(',')).join(';')
  // }

  // // 지도에 그리기 위한 GeoJSON 형식으로 변경
  // const createGeoJSONLine = (coordinates: number[][]) => {
  //   return {
  //     type: 'Feature',
  //     properties: {},
  //     geometry: {
  //       type: 'LineString',
  //       coordinates: coordinates,
  //     },
  //   }
  // }

  // const currentCoordinates =
  //   currentDay != 0 ? travelSchedule[currentDay - 1].map((place) => [
  //         place.coordinate![1],
  //         place.coordinate![0],
  //       ])
  //     : []

  // const [routeGeoJSON, setRouteGeoJSON] = useState<RouteGeoJSON | null>(null)

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
        longitude: selectedPlace?.coordinate[1] - 0.012 ?? 0,
        latitude: selectedPlace?.coordinate[0] ?? 0,
      })
    }
  }, [selectedPlace])
  useEffect(() => {
    const currentTravelSchedule: PlaceInfo[] =
      currentDay > 0 ? travelSchedule[currentDay - 1] : []
    if (currentTravelSchedule.length === 0) return
    const longtitude: number =
      currentTravelSchedule.reduce(
        (total, place) => total + place.coordinate![1],
        0,
      ) / currentTravelSchedule.length
    const latitude: number =
      currentTravelSchedule.reduce(
        (total, place) => total + place.coordinate![0],
        0,
      ) / currentTravelSchedule.length
    onSelectCity({
      longitude: longtitude - 0.03,
      latitude: latitude,
    })
  }, [currentDay])
  const mapRef = useRef<MapRef | null>(null)

  const onSelectCity = useCallback(
    ({ longitude, latitude }: { longitude: number; latitude: number }) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: 12.5,
      })
    },
    [],
  )

  // Optimization API 호출
  // const fetchOptimizedRoute = async (coordinates: number[][]): Promise<any> => {
  //   const profile = 'mapbox/driving'
  //   const coordinatesStr = convertCoordinatesToString(coordinates)
  //   // console.log('coordinatesStr: ' + coordinatesStr)

  //   const url = `https://api.mapbox.com/optimized-trips/v1/${profile}/${coordinatesStr}?access_token=${TOKEN}&source=first&destination=last&roundtrip=false`

  //   // console.log('url: ' + url)

  //   try {
  //     const response = await fetch(url)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok')
  //         }

  //         // 스트림 데이터를 JSON 형식으로 변환
  //         return response.json()
  //       })
  //       .then((jsonData) => {
  //         // console.log('JSON data:', jsonData)
  //         return jsonData
  //       })
  //       .catch((error) => {
  //         console.error('Fetch error:', error)
  //       })
  //     const jsonResponse = await response
  //     // console.log('response:', jsonResponse)
  //     return jsonResponse
  //   } catch (error) {
  //     console.error('Error fetching optimized route:', error)
  //     return []
  //   }
  // }

  // useEffect(() => {
  //   const getOptimizedRoute = async () => {
  //     const optimizedRoute = await fetchOptimizedRoute(currentCoordinates)
  //     // 여기서 수정: 객체를 그대로 전달합니다.
  //     // console.log('optimizedRoute:', optimizedRoute)
  //     const geometry = optimizedRoute.trips[0].geometry
  //     // console.log('geometry:', geometry)
  //     const routeGeoJSONLine = createGeoJSONLine(polyline.decode(geometry))
  //     // console.log('routeGeoJSONLine:', routeGeoJSONLine)
  //     setRouteGeoJSON(routeGeoJSONLine)
  //   }

  //   if (currentDay != 0) getOptimizedRoute()
  // }, [currentDay])

  const [activeIndex, setActiveIndex] = useState<number>(-1)

  return (
    <div className="flex-grow">
      <TravelChat></TravelChat>
      <Map
        ref={mapRef}
        style={{ width: '100wh', height: '100vh' }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/zigdeal/clkjl2a7y001401r27iv81iw2"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        {/* <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" /> */}
        {travelSchedule.map((day, i) =>
          day.map(
            (place, j) =>
              (currentDay == 0 || currentDay == i + 1) && (
                <div
                  onMouseEnter={() => {
                    setActiveIndex(1000 * i + j)
                  }}
                  onMouseLeave={() => {
                    setActiveIndex(-1)
                  }}
                  key={1000 * i + j}
                >
                  <Marker
                    style={{
                      zIndex:
                        selectedPlace?.name === place.name
                          ? 100
                          : activeIndex === 1000 * i + j
                          ? 101
                          : 0,
                    }}
                    key={j}
                    latitude={place.coordinate![0]}
                    longitude={place.coordinate![1]}
                    onClick={(e) => {
                      e.originalEvent.stopPropagation()
                      dispatch(handleCurrentPlace(place))
                    }}
                  >
                    <NaverPin
                      name={place.name}
                      clicked={selectedPlace?.name === place.name}
                      hover={activeIndex === 1000 * i + j}
                    ></NaverPin>
                  </Marker>
                </div>
              ),
          ),
        )}
        {selectedPlace && selectedPlace.coordinate && (
          <div></div>
          // <Popup
          //   className="w-96"
          //   anchor="top"
          //   // latitude={selectedPlace.coordinate[0] + 0.0025}
          //   latitude={selectedPlace.coordinate[0]}
          //   longitude={selectedPlace.coordinate[1]}
          //   onClose={() => {
          //     dispatch(handleCurrentPlace(selectedPlace))
          //   }}
          // >
          //   <div>{selectedPlace.name}</div>
          //   {/* <TravelContainer></TravelContainer> */}
          // </Popup>
        )}
        {/* {routeGeoJSON && (
          <Source
            key="route"
            id="route"
            type="geojson"
            data={{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeGeoJSON.geometry.coordinates.map(
                  (coordinate) => [coordinate[1], coordinate[0]],
                ),
              },
            }}
          >
            <Layer
              id="route"
              type="line"
              source="route"
              paint={{
                'line-width': 6,
                'line-color': '#80FF00',
                // 'line-offset': 2,
              }}
            />
          </Source>
        )} */}
      </Map>

      {showChat && <ChatScreen onClose={() => dispatch(setShowChat(false))} />}
    </div>
  )
}

export default TravelMap
