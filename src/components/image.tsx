import Image from 'next/image'
import useSWR from 'swr'

interface IPostImageProps {
  featuredMedia: string
  alt: string
}

const PostImage: React.FC<IPostImageProps> = ({ featuredMedia, alt }) => {
  const { data, error } = useSWR(`media/${featuredMedia}`)
  return (
    <>
      {data && !error && (
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
