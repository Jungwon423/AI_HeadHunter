import Image from "next/legacy/image"

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
        <div className="w-full md:w-2/3 pr-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome to My Website
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            This is a brief introduction to my website. Here, you can find
            information about my services and products. Feel free to explore and
            contact me if you have any questions.
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
    )
  } else {
    return (
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
            information about my services and products. Feel free to explore and
            contact me if you have any questions.
          </p>
        </div>
      </div>
    )
  }
}

export default ImageExplain
