import Head from 'next/head'
import { NavbarTwoColumns } from '../navbar/NavbarTwoColumns'
import Hero from '../components/Hero'
import Destinations from '../components/Destination'
// import Reviews from '../components/Reviews';
import Packages from '../components/Packages'
import { Footer } from '../footer/Footer'
import { Logo } from '../logo/Logo'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarTwoColumns logo={<Logo />}>
        <li>
          <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="/">Sign in</Link>
        </li>
      </NavbarTwoColumns>

      <main>
        <Hero />
        <Destinations />
        {/* <Reviews /> */}
        <Packages />
      </main>

      <Footer />
    </>
  )
}
