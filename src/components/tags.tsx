import Link from 'next/link'
import { useWordpressApi } from 'lib/hooks'

import type { ITag } from 'types/wordpress'

interface IPostTagsProps {
  postId: string
}

const PostTags: React.FC<IPostTagsProps> = ({ postId }) => {
  const { data } = useWordpressApi<ITag[]>(`tags?post=${postId}`)
  return (
    <div className='flex flex-row w-full mb-2'>
      {data?.map((tag) => (
        <Link key={tag.slug} href={`/tag/${tag.slug}`}>
          <a className='mx-1 bg-black text-white rounded-full px-3 py-1'>{tag.name}</a>
        </Link>
      ))}
    </div>
  )
}

export default PostTags
