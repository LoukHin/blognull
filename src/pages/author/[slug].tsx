import { useRouter } from 'next/router'

import Head from 'components/head'
import PostCard from 'components/post-card'
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
          <PostCard key={`${post.id}`} post={post} />
        ))}
      </div>
    </>
  )
}

export default Author
