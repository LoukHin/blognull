import useSWR from 'swr'

import Head from 'components/head'
import PostImage from 'components/image'
import Link from 'next/link'

const Index = () => {
  const { data, error } = useSWR('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')

  return (
    <>
      <Head title='Home' />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        {data?.map((post) => (
          <Link key={`${post.id}`} href={`${post.slug}`}>
            <a className='w-full mx-auto my-2'>
              <div className='rounded overflow-hidden ring-1 ring-gray-200 duration-150 hover:shadow'>
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
