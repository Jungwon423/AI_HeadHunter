import Image from 'next/image'

const TitleImage = () => {
  return (
    <div className="my-16">
      <Image
        src="/assets/images/introduction-image.png"
        alt="Introduction Image"
        layout="responsive"
        width={1200}
        height={1200}
      />
    </div>
  )
}

export default TitleImage
