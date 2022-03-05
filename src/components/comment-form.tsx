import ky, { HTTPError } from 'ky'
import config from 'lib/config'
import { FormEventHandler, useState } from 'react'

interface ICommentFormProps {
  postId: number
  onComment: Function
}

const CommentForm: React.FC<ICommentFormProps> = ({ postId, onComment }) => {
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nameInputHandler: FormEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget
    setName(value)
    setError(null)
  }

  const commentInputHandler: FormEventHandler<HTMLTextAreaElement> = (event) => {
    const { value } = event.currentTarget
    setComment(value)
    setError(null)
  }

  const commentButtonClickHandler = async () => {
    setSending(true)
    try {
      await ky.post('comments', {
        prefixUrl: config.cmsApiUrl,
        headers: {
          authorization: config.cmsApiAuthorization,
        },
        json: {
          author_name: name.trim() || 'Anonymous',
          content: comment.trim(),
          post: postId,
        },
      })
      setComment('')
      onComment()
      setSending(false)
    } catch (error) {
      const { message } = await (error as HTTPError).response.json()
      setError(message)
    }
  }

  return (
    <div className='flex flex-col w-full'>
      <span className='text-xl font-bold'>Leave a comment</span>
      <div className='my-2'>
        <label htmlFor='name' className='font-bold'>
          Your name (optional)
        </label>
        <input
          className='flex w-full rounded-md mt-2 py-2 px-3 border-2 border-gray-300'
          type='text'
          id='name'
          value={name}
          onInput={nameInputHandler}
        />
      </div>
      <div className='my-2'>
        <label htmlFor='comment' className='font-bold'>
          Comment
        </label>
        <textarea
          className='flex min-h-[70px] w-full rounded-md mt-2 py-2 px-3 border-2 border-gray-300'
          id='comment'
          value={comment}
          onInput={commentInputHandler}
        />
      </div>
      {error && <span className='mb-2 text-red-500'>{error}</span>}
      <button
        className='rounded-md bg-black py-2 bg-opacity-10 hover:bg-opacity-20 disabled:hover:bg-opacity-10 disabled:cursor-not-allowed'
        onClick={commentButtonClickHandler}
        disabled={!!!comment || sending}
      >
        Comment
      </button>
    </div>
  )
}

export default CommentForm
