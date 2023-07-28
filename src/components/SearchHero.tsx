import Image from 'next/legacy/image'

export default function SearchHero() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/travel.jpg"
          alt="travel"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          AI가 만들어 주는{' \n'}
          <div className="text-primary-500">나만의 여행</div>
        </h1>
      </div>
    </section>
  )
}
