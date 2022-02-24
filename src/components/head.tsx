import config from 'lib/config'
import NextHead from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  title?: string
  description?: string
  keywords?: string
  image?: string
}

const Head: React.FC<Props> = (props) => {
  const {
    title,
    description = '',
    image = `${config.appURL}/static/default-share-image.png`,
    children,
  } = props

  const pageTitle = title ? `${title} - ${config.appName}` : config.appName

  const router = useRouter()
  const currentURL = router.asPath

  return (
    <NextHead>
      <title>{pageTitle}</title>

      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta property='og:url' content={currentURL} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={image} />

      <link rel='icon' type='image/png' href={`/static/favicon.png`} />

      {children}
    </NextHead>
  )
}

export default Head
