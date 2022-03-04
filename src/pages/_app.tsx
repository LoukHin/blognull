import type { AppProps } from 'next/app'
import ky from 'ky'
import { SWRConfig } from 'swr'

import NavBar from 'components/navbar'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => ky(url).json(),
      }}
    >
      <NavBar />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
