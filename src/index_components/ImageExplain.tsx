import Image from 'next/image'

type ImageExplainProps = {
  left: boolean
  h1Text: string
  pText: string
  image: string
}

const ImageExplain: React.FC<ImageExplainProps> = ({
  left,
  h1Text,
  pText,
  image,
}) => {
  if (left) {
    return (
      <div className="flex flex-col md:flex-row items-center">
        {/* First image on the right and text on the left */}
        <div className="w-full md:w-1/3 p-2">
          <h1 className="text-xl font-extrabold text-gray-900">{h1Text}</h1>
          <p className="mt-4 text-lg text-gray-500">{pText}</p>
        </div>
        <div className="w-full md:w-2/3">
          <Image
            src={image}
            alt="Introduction Image"
            width={600}
            height={400}
            className="relative border-gray-300 border-2 border-spacing-60 rounded-lg shadow-xl"
            priority
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col md:flex-row items-center mt-16">
        {/* Second image on the left and text on the right */}
        <div className="w-full md:w-2/3 px-5">
          <div className="w-full">
            <Image
              src={image}
              alt="Screenshot 1"
              width={600}
              height={400}
              className="relative border-gray-300 border-2 border-spacing-60 rounded-lg shadow-xl"
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="text-xl font-extrabold text-gray-900">{h1Text}</div>
          <div className="mt-4 text-lg text-gray-500">{pText}</div>
        </div>
      </div>
    )
  }
}

export default ImageExplain
