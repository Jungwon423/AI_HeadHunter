import Image from 'next/image';
import {Button} from './button';

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          The modern landing page for{' '}
          <span className="text-primary-500">React developers</span>
        </h1>
        <p className="mt-6 max-w-3xl text-xl sm:text-2xl text-gray-300">
          The easiest way to build a React landing page in seconds.
        </p>
        <div className="mt-12">
            <Button xl>Download Your Free Theme</Button>
        </div>
      </div>
    </section>
  );
}