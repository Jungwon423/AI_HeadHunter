import Image from 'next/image'
import { Button } from './button'

const packages = [
  {
    id: 1,
    name: 'Basic Package',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 99,
    image: '/package-1.jpg',
  },
  {
    id: 2,
    name: 'Standard Package',
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 199,
    image: '/package-2.jpg',
  },
  {
    id: 3,
    name: 'Premium Package',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    price: 299,
    image: '/package-3.jpg',
  },
]

export default function Packages() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Featured Packages
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500">
          Choose from our most popular packages and save up to 20%.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow">
              <div className="relative">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  width={600}
                  height={400}
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 px-4 py-6 flex items-center justify-center">
                  <Button xl>Learn More</Button>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-gray-600">{pkg.description}</p>
                <div className="mt-3">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${pkg.price}
                  </span>
                  <span className="ml-1 text-base font-medium text-gray-500">
                    /month
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
