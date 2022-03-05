import Link from 'next/link'

import Head from 'components/head'
import PostImage from 'components/image'
import { useWordpressApi } from 'lib/hooks'

import type { IPost } from 'types/wordpress'

const Index = () => {
  const { data } = useWordpressApi<IPost[]>('posts')

  return (
    <>
      <Head title='Home' />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        {data?.map((post) => (
          <Link key={`${post.id}`} href={`${post.slug}`}>
            <a className='w-full mx-auto my-2'>
              <div className='rounded overflow-hidden ring-1 ring-gray-200 duration-150 hover:shadow-lg hover:ring-gray-400'>
                <PostImage featuredMedia={post.featured_media} alt={post.title.rendered} />
                <div className='p-3'>
                  <div className='mb-2 text-2xl font-medium'>{post.title.rendered}</div>
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Index
