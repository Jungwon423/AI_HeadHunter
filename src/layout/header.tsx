import Head from 'next/head'
import Link from 'next/link'

type AppLayoutProps = {
  children: React.ReactNode
}

export default function HeaderLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <Head>
        <title>Trippy</title>
        <Link href="/favicon.ico"></Link>
        {children}
      </Head>
    </div>
  )
}
