import Image from 'next/image'

import type { IComment } from 'types/wordpress'

interface ICommentProps {
  comment: IComment
}

const Comment: React.FC<ICommentProps> = ({ comment }) => {
  return (
    <div className='w-full flex flex-col my-2 py-10 px-16 rounded overflow-hidden ring-1 ring-gray-200'>
      <div className='flex flex-row mb-4 items-center relative'>
        <Image
          src={comment.author_avatar_urls[48]}
          alt={`${comment.author_name}'s avatar`}
          width='48'
          height='48'
          layout='fixed'
          className='rounded-full'
        />
        <span className='ml-3'>{comment.author_name}</span>
      </div>
      <div className='flex'>
        <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }}></div>
      </div>
    </div>
  )
}

export default Comment
