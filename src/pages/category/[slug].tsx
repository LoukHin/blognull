import Link from 'next/link'
import { useRouter } from 'next/router'

import Head from 'components/head'
import PostCard from 'components/post-card'
import { useWordpressApi } from 'lib/hooks'

import type { ICategory, IPost } from 'types/wordpress'

const Category = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: categories } = useWordpressApi<ICategory[]>(`categories?slug=${slug}`, [slug])
  const { data: posts } = useWordpressApi<IPost[]>(`posts?categories=${categories?.[0].id}`, [
    categories?.[0].id,
  ])

  return (
    <>
      <Head title={categories?.[0].name} />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        <span className='w-full text-2xl'>Category: {categories?.[0].name}</span>
        <hr className='w-full my-3 border-b border-gray-200' />
        {posts?.map((post) => (
          <PostCard key={`${post.id}`} post={post} />
        ))}
      </div>
    </>
  )
}

export default Category
