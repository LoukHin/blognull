import ky from 'ky'
import { useEffect, useMemo, useState } from 'react'

import config from 'lib/config'

const useWordpressApi = <T = any>(path: string, dependencies: any[] = []) => {
  const [data, setData] = useState<T>()
  const [error, setError] = useState()

  const canSentRequest = useMemo(
    () => !dependencies.some((dependency) => !dependency),
    [dependencies]
  )

  useEffect(() => {
    if (canSentRequest) {
      ky.get(path, {
        prefixUrl: config.cmsApiUrl,
        headers: {
          Authorization: config.cmsApiAuthorization,
        },
      })
        .json<T>()
        .then(setData)
        .catch(setError)
    }
  }, [path, canSentRequest])

  return { data, error }
}

export { useWordpressApi }
