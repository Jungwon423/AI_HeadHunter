import Head from 'next/head'
import Image from 'next/image'
import MyNavbar from '../navbar/MyNavbar'

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Head section */}
      <Head>
        <title>Triper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation section */}
      <MyNavbar />

      {/* Main content section */}
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black text-3xl md:text-5xl font-bold text-center">
            Build your next vacation with AI
          </h1>
          <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-xl md:text-3xl font-bold mt-4">
            Explore more, Plan less
          </h2>
        </div>

        <form className="mt-8 flex justify-between">
          {/* Destination input */}
          <div className="relative w-3/4">
            <label htmlFor="destination" className="sr-only">
              Destination
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 14.293a1 1 0 0 1-1.414 0l-3.8-3.8a5.5 5.5 0 1 1 1.414-1.414l3.8 3.8a1 1 0 0 1 0 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="destination"
              name="destination"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-10 h-10"
              placeholder="Where do you want to go?"
              required
              style={{
                borderColor: '#ddd',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            />
          </div>

          {/* Search button */}
          <div className="mt-4 ml-4 w-1/4">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full h-10"
            >
              Search
            </button>
          </div>
        </form>

        <div className="my-16">
          <Image
            src="/assets/images/introduction-image.png"
            alt="Introduction Image"
            layout="responsive"
            width={1200}
            height={1200}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center">
          {/* First image on the right and text on the left */}
          <div className="w-full md:w-2/3 pr-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Welcome to My Website
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              This is a brief introduction to my website. Here, you can find
              information about my services and products. Feel free to explore
              and contact me if you have any questions.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <Image
              src="/assets/images/introduction-image.png"
              alt="Introduction Image"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center mt-16">
          {/* Second image on the left and text on the right */}
          <div className="w-full md:w-1/2 pr-8">
            <Image
              src="/assets/images/screenshot1.webp"
              alt="Screenshot 1"
              layout="responsive"
              width={800}
              height={640}
              className="border-gray-300 border-4 border-solid rounded-lg shadow-sm"
              style={{
                borderColor: '#ddd',
                borderWidth: '4px',
                borderStyle: 'solid',
                boxShadow:
                  '0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.05), 0 16px 32px rgba(0, 0, 0, 0.05), 0 32px 64px rgba(0, 0, 0, 0.05)',
              }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Welcome to My Website
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              This is a brief introduction to my website. Here, you can find
              information about my services and products. Feel free to explore
              and contact me if you have any questions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-800 py-8">
        <p className="text-center text-gray-400">
          &copy; 2021 Plan Your Next Trip
        </p>
      </footer>
    </div>
  )
}
