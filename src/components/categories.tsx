import Link from 'next/link'
import { useWordpressApi } from 'lib/hooks'

import type { ICategory } from 'types/wordpress'

interface IPostCategoriesProps {
  postId: number
}

const PostCategories: React.FC<IPostCategoriesProps> = ({ postId }) => {
  const { data: categories } = useWordpressApi<ICategory[]>(`categories?post=${postId}`)
  return (
    <div className='flex flex-row w-full mb-2 -mx-1'>
      {categories?.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <a className='mx-1 bg-black text-white rounded-full px-3 py-1'>{category.name}</a>
        </Link>
      ))}
    </div>
  )
}

export default PostCategories
