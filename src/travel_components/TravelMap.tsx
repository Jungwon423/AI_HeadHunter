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

const TravelMap = () => {
  const pinColors = [
    '#FF5A5F',
    '#00A699',
    '#FFB400',
    '#007A87',
    '#FEBB31',
    '#6B5B95',
    '#F37735',
    '#CCD6DD',
    '#D84A4A',
    '#DBD5B5',
    '#7DCFB6',
    '#1287A5',
    '#F3C969',
    '#A5AAD9',
    '#E6B89C',
    '#EFEFEF',
    '#CF6766',
    '#4F84C4',
    '#A5AA52',
    '#D4CFC9',
  ]

  const showChat = useSelector(selectShowChat)

  const dispatch = useDispatch()

  const selectedPlace = useSelector(selectCurrentPlace)
  const currentDay: number = useSelector(selectCurrentDay)

  const travelSchedule: PlaceInfo[][] = useSelector(selectTravelSchedule) || []
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const coordinate = useSelector(selectCoordinate)
  interface RouteGeoJSON {
    type: string
    properties: {}
    geometry: {
      type: string
      coordinates: number[][]
    }
  }

  // 좌표들을 세미콜론으로 구분된 문자열 형식으로 변경
  const convertCoordinatesToString = (coordinates: number[][]) => {
    return coordinates.map((coordinate) => coordinate.join(',')).join(';')
  }

  // 지도에 그리기 위한 GeoJSON 형식으로 변경
  const createGeoJSONLine = (coordinates: number[][]) => {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates,
      },
    }
  }

  const currentCoordinates = travelSchedule
    .map((day) =>
      day.map((place) => [place.coordinate![1], place.coordinate![0]]),
    )
    .flat()

  const [routeGeoJSON, setRouteGeoJSON] = useState<RouteGeoJSON | null>(null)

  const [viewState, setViewState] = useState({
    longitude: coordinate[0], //130 어쩌구
    latitude: coordinate[1],
    zoom: 11.7,
  })
  useEffect(() => {
    if (selectedPlace?.coordinate !== undefined) {
      console.log(selectedPlace?.coordinate)
      onSelectCity({
        longitude: selectedPlace?.coordinate[1]!,
        latitude: selectedPlace?.coordinate[0]!,
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

  // Optimization API 호출
  const fetchOptimizedRoute = async (coordinates: number[][]): Promise<any> => {
    const profile = 'mapbox/driving'
    const coordinatesStr = convertCoordinatesToString(coordinates)
    console.log('coordinatesStr: ' + coordinatesStr)

    const url = `https://api.mapbox.com/optimized-trips/v1/${profile}/${coordinatesStr}?access_token=${TOKEN}`

    console.log('url: ' + url)

    try {
      const response = await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          // 스트림 데이터를 JSON 형식으로 변환
          return response.json()
        })
        .then((jsonData) => {
          console.log('JSON data:', jsonData)
          return jsonData
        })
        .catch((error) => {
          console.error('Fetch error:', error)
        })
      const jsonResponse = await response
      console.log('response:', jsonResponse)
      return jsonResponse
    } catch (error) {
      console.error('Error fetching optimized route:', error)
      return []
    }
  }

  useEffect(() => {
    const getOptimizedRoute = async () => {
      const optimizedRoute = await fetchOptimizedRoute(
        currentCoordinates.slice(0, 12),
      )
      // 여기서 수정: 객체를 그대로 전달합니다.
      console.log('optimizedRoute:', optimizedRoute)
      const geometry = optimizedRoute.trips[0].geometry
      console.log('geometry:', geometry)
      const routeGeoJSONLine = createGeoJSONLine(polyline.decode(geometry))
      console.log('routeGeoJSONLine:', routeGeoJSONLine)
      setRouteGeoJSON(routeGeoJSONLine)
    }

    getOptimizedRoute()
  }, [])

  return (
    <div className="flex-grow">
      <TravelChat></TravelChat>
      <Map
        ref={mapRef}
        // style={{ width: '100vw', height: '100vh' }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/zigdeal/clkjl2a7y001401r27iv81iw2"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {/* <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" /> */}
        {travelSchedule.map((day, i) =>
          day.map(
            (place, j) =>
              (currentDay == 0 || currentDay == i + 1) && (
                <Marker
                  key={j}
                  latitude={place.coordinate![0]}
                  longitude={place.coordinate![1]}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation()
                    dispatch(handleCurrentPlace(place))
                    console.log('Marker Clicked')
                    console.log(place)
                  }}
                >
                  <Pin color={pinColors[i]}></Pin>
                </Marker>
              ),
          ),
        )}
        {selectedPlace && selectedPlace.coordinate && (
          <Popup
            anchor="top"
            latitude={selectedPlace.coordinate[0]}
            longitude={selectedPlace.coordinate[1]}
            onClose={() => {
              dispatch(handleCurrentPlace(selectedPlace))
            }}
          >
            <div>{selectedPlace.name}</div>
          </Popup>
        )}
        {routeGeoJSON && (
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
                'line-width': 3,
                'line-color': '#007cbf',
              }}
            />
          </Source>
        )}
        {/* {travelSchedule.map(
          (day, i) =>
            (currentDay == 0 || currentDay == i + 1) && (
              <Source
                key={i}
                id="route"
                type="geojson"
                data={{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: day.map((place, j) => [
                      place.coordinate[1],
                      place.coordinate[0],
                    ]),
                  },
                }}
              >
                <Layer
                  id="route"
                  type="line"
                  source="route"
                  // layout={{
                  //   'line-join': 'round',
                  //   'line-cap': 'round',
                  // }}
                  paint={{
                    'line-color': '#007cbf',
                    'line-width': 4,
                  }}
                />
              </Source>
            ),
        )} */}
      </Map>

      {showChat && <ChatScreen onClose={() => dispatch(setShowChat(false))} />}
    </div>
  )
}

export default TravelMap
