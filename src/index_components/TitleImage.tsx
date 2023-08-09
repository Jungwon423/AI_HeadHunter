import Image from "next/legacy/image"

const TitleImage = () => {
  return (
    <div className="my-16">
      <Image
        src="/assets/images/introduction-image.png"
        alt="Introduction Image"
        width={1200}
        height={1200}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}

export default TitleImage
