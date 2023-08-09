import router from 'next/router'
import Image from "next/legacy/image"

export default function MyNavbar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow">
      <div className="flex justify-between h-16">
        <button onClick={() => router.push('/')}>
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <span className="ml-2 font-bold text-xl font-mono">Trippy</span>
          </div>
        </button>
        <div className="flex items-center">
          <button className="px-4 py-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
