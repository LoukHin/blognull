import Link from 'next/link'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'


import { useWordpressApi } from 'lib/hooks'
import type { IPost, IUser } from 'types/wordpress'

interface IPostInfoProps {
  postId: number
  className?: string
}

dayjs.extend(calendar)

const PostInfo: React.FC<IPostInfoProps> = ({ postId, className }) => {
  const { data: posts } = useWordpressApi<IPost[]>(`posts?include=${postId}`, [postId])
  const post = posts?.[0]
  const { data: users } = useWordpressApi<IUser[]>(`users?include=${post?.author}`, [post?.author])
  const author = users?.[0]

  return (
    <>
      {post && author && (
        <div className={`w-full mb-2 ${className || ''}`}>
          by
          <Link href={`/author/${author.slug}`}>
            <a className='ml-1 duration-150 underline text-black hover:text-opacity-70'>
              {author.name}
            </a>
          </Link>, updated on: {dayjs().calendar(post.modified)}
        </div>
      )}
    </>
  )
}

export default PostInfo
