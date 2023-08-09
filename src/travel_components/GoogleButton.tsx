import React from 'react'
import Image from 'next/image'

interface GoogleButtonProps {
  url: string
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ url }) => {
  const redirectToUrl = () => {
    window.location.href = url
  }

  return (
    <button
      className={`flex items-center justify-center bg-white border-2 border-gray-300 rounded px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300`}
      onClick={redirectToUrl}
    >
      <Image
        src="/assets/images/google2.png"
        alt="Google Logo"
        width={20}
        height={20}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <span className="ml-2 font-medium">Google Maps</span>
    </button>
  )
}

export default GoogleButton
