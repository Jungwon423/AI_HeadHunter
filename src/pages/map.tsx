import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import mapboxgl from 'mapbox-gl'

export default function Home() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9,
  })

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Travel Planner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center">
            <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2 mr-2">
              Menu
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2 mr-2">
              Share
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2">
              Account
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">Plan Your Next Trip</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
            Search
          </button>
        </div>
        <div>
          {/* Add your second area here */}
          <div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
      </main>
    </div>
  )
}
