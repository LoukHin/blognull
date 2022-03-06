import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import calendar from 'dayjs/plugin/calendar'
import Image from 'next/image'

import type { IComment } from 'types/wordpress'

interface ICommentProps {
  comment: IComment
}

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(calendar)

const Comment: React.FC<ICommentProps> = ({ comment }) => {
  return (
    <div className='w-full flex flex-col my-2 py-10 px-16 rounded overflow-hidden ring-1 ring-gray-200'>
      <div className='flex flex-row mb-4 items-center relative'>
        <Image
          src={comment.author_avatar_urls[48]}
          alt={`${comment.author_name || 'Anonymous'}'s avatar`}
          width='48'
          height='48'
          layout='fixed'
          className='rounded-full'
        />
        <div className='ml-3'>
          <div className={`font-bold ${!comment.author_name ? 'italic' : ''}`}>
            {comment.author_name || 'Anonymous'}
          </div>
          <div className='font-light text-xs'>
            {dayjs.utc(comment.date_gmt).tz().calendar(null, { sameElse: 'DD/MM/YYYY [at] h:mm A' })}
          </div>
        </div>
      </div>
      <div className='flex'>
        <div
          className='prose prose-img:mx-auto'
          dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
        ></div>
      </div>
    </div>
  )
}

export default Comment
