import { useRouter } from 'next/router'

import Head from 'components/head'
import PostCategories from 'components/categories'
import { useWordpressApi } from 'lib/hooks'

import type { IPost } from 'types/wordpress'

const PostSlug = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data } = useWordpressApi<IPost[]>(`posts?slug=${slug}`, [slug])

  return (
    <>
      <Head title='Home' />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        {data?.[0] && (
          <>
            <div className='mb-2 text-2xl font-medium'>{data[0].title.rendered}</div>
            <PostCategories postId={data[0].id} />
            <div dangerouslySetInnerHTML={{ __html: data[0].content.rendered }}></div>
          </>
        )}
      </div>
    </>
  )
}

export default PostSlug
