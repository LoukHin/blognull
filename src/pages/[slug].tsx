import { useRouter } from 'next/router'

import Head from 'components/head'
import PostCategories from 'components/categories'
import { useWordpressApi } from 'lib/hooks'

import type { IPost } from 'types/wordpress'

const PostSlug = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: posts } = useWordpressApi<IPost[]>(`posts?slug=${slug}`, [slug])
  const post = posts?.[0]

  return (
    <>
      <Head title={post?.title.rendered} />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        {post && (
          <>
            <div className='mb-2 text-2xl font-medium'>{post?.title.rendered}</div>
            <PostCategories postId={post?.id} />
            <div dangerouslySetInnerHTML={{ __html: post?.content.rendered }}></div>
          </>
        )}
      </div>
    </>
  )
}

export default PostSlug
