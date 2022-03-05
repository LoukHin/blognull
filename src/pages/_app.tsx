import type { AppProps } from 'next/app'
import ky from 'ky'
import { SWRConfig } from 'swr'

import NavBar from 'components/navbar'
import config from 'lib/config'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (path) =>
          ky.get(path, {
            prefixUrl: config.cmsApiUrl,
            headers: {
              'Authorization': config.cmsApiAuthorization,
            },
          }).json(),
      }}
    >
      <NavBar />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
