import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Plan Your Next Trip</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Plan Your Next Trip
        </h1>
        <form className="mt-8">
          <div>
            <label htmlFor="destination" className="sr-only">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Where do you want to go?"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="date" className="sr-only">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="When do you want to go?"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </div>
        </form>
      </main>

      <footer className="bg-gray-800 py-8">
        <p className="text-center text-gray-400">
          &copy; 2021 Plan Your Next Trip
        </p>
      </footer>
    </div>
  );
}