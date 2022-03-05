import Link from 'next/link'

import PostImage from 'components/image'
import PostInfo from 'components/post-info'

import type { IPost } from 'types/wordpress'

interface IPostCardProps {
  post: IPost
}

const PostCard: React.FC<IPostCardProps> = ({ post }) => {
  return (
    <Link href={`/${post.slug}`}>
      <a className='w-full mx-auto my-2'>
        <div className='rounded overflow-hidden ring-1 ring-gray-200 duration-150 hover:shadow-lg hover:ring-gray-400'>
          <PostImage featuredMedia={post.featured_media} alt={post.title.rendered} />
          <div className='p-3'>
            <div className='mb-2 text-2xl font-medium'>{post.title.rendered}</div>
            <div className='wp-content' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
            <PostInfo post={post} className='mt-2' />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostCard
