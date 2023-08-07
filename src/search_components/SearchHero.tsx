import Image from 'next/legacy/image'

export default function SearchHero() {
  return (
    <section className="relative h-[40vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] 2xl:h-[80vh]">
      <div className="relative w-full h-full">
        <Image
          src="/assets/images/travel.jpg"
          alt="travel"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 sm:inset-10 md:inset-30 xl:inset-40 flex items-center px-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            AI가 만들어 주는{' \n'}
            <div className="text-primary-500">나만의 여행</div>
          </h1>
        </div>
      </div>
    </section>
  )
}
