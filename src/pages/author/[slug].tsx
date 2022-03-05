import Link from 'next/link'
import { useRouter } from 'next/router'

import Head from 'components/head'
import PostImage from 'components/image'
import { useWordpressApi } from 'lib/hooks'

import type { IUser, IPost } from 'types/wordpress'

const Author = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: users } = useWordpressApi<IUser[]>(`users?slug=${slug}`, [slug])
  const { data: posts } = useWordpressApi<IPost[]>(`posts?author=${users?.[0].id}`, [users?.[0].id])

  return (
    <>
      <Head title={users?.[0].name} />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        <span className='w-full text-2xl'>Author: {users?.[0].name}</span>
        <hr className='w-full my-3 border-b border-gray-200' />
        {posts?.map((post) => (
          <Link key={`${post.id}`} href={`/${post.slug}`}>
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

export default Author
