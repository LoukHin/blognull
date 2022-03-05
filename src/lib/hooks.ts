import ky from 'ky'
import { useEffect, useState } from 'react'

import config from 'lib/config'

const useWordpressApi = (path: string) => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState()

  useEffect(() => {
    ky.get(path, {
      prefixUrl: config.cmsApiUrl,
      headers: {
        Authorization: config.cmsApiAuthorization,
      },
    })
      .json()
      .then(setData)
      .catch(setError)
  }, [path])

  return { data, error }
}

export { useWordpressApi }
