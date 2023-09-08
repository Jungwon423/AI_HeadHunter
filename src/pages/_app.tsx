import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import HeaderLayout from '../layout/header'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
        <meta name="referrer" content="no-referrer"></meta>
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
