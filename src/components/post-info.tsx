import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import calendar from 'dayjs/plugin/calendar'

import { useWordpressApi } from 'lib/hooks'
import type { IPost, IUser } from 'types/wordpress'

interface IPostInfoProps {
  post: IPost
  enableAuthorLink?: boolean
  className?: string
}

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(calendar)

const PostInfo: React.FC<IPostInfoProps> = ({ post, enableAuthorLink, className }) => {
  const { data: users } = useWordpressApi<IUser[]>(`users?include=${post.author}`, [post.author])
  const author = users?.[0]

  return (
    <>
      {author && (
        <div className={`w-full mb-2 ${className || ''}`}>
          by
          {enableAuthorLink ? (
            <Link href={`/author/${author.slug}`}>
              <a className='ml-1 duration-150 underline text-black hover:text-opacity-70'>
                {author.name}
              </a>
            </Link>
          ) : (
            <span className='ml-1'>{author.name}</span>
          )}
          , updated on: {dayjs.utc(post.modified_gmt).tz().calendar(null, { sameElse: 'DD/MM/YYYY [at] h:mm A' })}
        </div>
      )}
    </>
  )
}

export default PostInfo
