import Image from 'next/image'

import { useWordpressApi } from 'lib/hooks'

interface IPostImageProps {
  featuredMedia: string
  alt: string
}

const PostImage: React.FC<IPostImageProps> = ({ featuredMedia, alt }) => {
  const { data: image } = useWordpressApi(`media/${featuredMedia}`, [featuredMedia])
  return (
    <>
      {image && (
        <div className='h-60 relative overflow-hidden'>
          <Image
            src={image.source_url}
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
