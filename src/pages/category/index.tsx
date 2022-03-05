import Link from 'next/link'

import Head from 'components/head'
import { useWordpressApi } from 'lib/hooks'

import type { ICategory } from 'types/wordpress'

const Category = () => {
  const { data: categories } = useWordpressApi<ICategory[]>(`categories`)

  return (
    <>
      <Head title='Category' />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        <span className='w-full text-2xl'>Category</span>
        <hr className='w-full my-3 border-b border-gray-200' />
        {categories?.map((category) => (
          <div key={`${category.id}`} className='w-1/3 p-1'>
            <Link href={`/category/${category.slug}`}>
              <a className='w-full'>
                <div className='p-3 rounded overflow-hidden ring-1 ring-gray-200 duration-150 hover:shadow-lg hover:ring-gray-400'>
                  <div className='text-2xl font-medium'>{category.name}</div>
                  {category.description && <div className='mt-2'>{category.description}</div>}
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Category
