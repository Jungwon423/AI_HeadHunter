import Image from 'next/image';

const destinations = [
  {
    id: 1,
    name: 'New York',
    image: '/destination-1.jpg',
  },
  {
    id: 2,
    name: 'Paris',
    image: '/destination-2.jpg',
  },
  {
    id: 3,
    name: 'Tokyo',
    image: '/destination-3.jpg',
  },
];

export default function Destinations() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Popular Destinations</h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500">
          Explore our most popular destinations and plan your next trip.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {destinations.map((destination) => (
            <div key={destination.id} className="relative">
              <Image
                src={destination.image}
                alt={destination.name}
                width={600}
                height={400}
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 px-4 py-6 flex items-center justify-center">
                <h3 className="text-lg font-medium text-white">{destination.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}