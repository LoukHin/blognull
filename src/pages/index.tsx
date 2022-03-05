import Head from 'components/head'
import PostCard from 'components/post-card'
import { useWordpressApi } from 'lib/hooks'

import type { IPost } from 'types/wordpress'

const Index = () => {
  const { data: posts } = useWordpressApi<IPost[]>('posts')

  return (
    <>
      <Head title='Home' />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        {posts?.map((post) => (
          <PostCard key={`${post.id}`} post={post} />
        ))}
      </div>
    </>
  )
}

export default Index
