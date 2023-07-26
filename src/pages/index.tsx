import type { NextPage } from 'next'
import Image from 'next/image'
import { Button } from '../components/button';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Footer } from '../footer/Footer';
import { Background } from '../background/Background';
import { Logo } from '../logo/Logo';
import { NavbarTwoColumns } from '../navbar/NavbarTwoColumns';

import type { ReactNode } from 'react';
import { Section } from '../layout/Section';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-gray-900">
      {props.title}
    </h1>
    <div className="mb-16 mt-4 text-2xl">{props.description}</div>

    {props.button}
  </header>
);

const Home: NextPage = () => {
  return (
    <div className="text-gray-600 antialiased">
    <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main><footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>    
      <div className="flex flex-col rounded-md bg-primary-100 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:p-12 sm:text-left">
        <div className="text-2xl font-semibold">
          <div className="text-gray-900">안녕하세요</div>
          <div className="text-primary-500">반갑습니다</div>
        </div>

        <div className="whitespace-no-wrap mt-3 sm:ml-2 sm:mt-0">
          <Button xl>Download Your Free Theme</Button>
        </div>
      </div>
  
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
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
      </Section>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={<>
            {'The modern landing page for\n'}
            <span className="text-primary-500">React developers</span>
          </>}
          description="The easiest way to build a React landing page in seconds."
          button={<Link href="https://creativedesignsguru.com/category/nextjs/">
            <Button xl>Download Your Free Theme</Button>
          </Link>} />
      </Section>
      <Footer></Footer>
    </Background>
      </div>
  )
}

export default Home
