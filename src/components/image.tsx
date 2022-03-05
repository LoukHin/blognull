import Image from 'next/image'

import { useWordpressApi } from 'lib/hooks'

interface IPostImageProps {
  featuredMedia: string
  alt: string
}

const PostImage: React.FC<IPostImageProps> = ({ featuredMedia, alt }) => {
  const { data } = useWordpressApi(`media/${featuredMedia}`, [featuredMedia])
  return (
    <>
      {data && (
        <div className='h-60 relative overflow-hidden'>
          <Image
            src={data.source_url}
            alt={alt}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
          />
        </div>
      )}
    </>
  )
}

export default PostImage
