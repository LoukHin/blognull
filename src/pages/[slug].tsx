import { useEffect, useState } from 'react'
import ky from 'ky'
import { useRouter } from 'next/router'

import Head from 'components/head'
import PostCategories from 'components/categories'
import PostInfo from 'components/post-info'
import Comment from 'components/comment'
import CommentForm from 'components/comment-form'
import config from 'lib/config'
import { useWordpressApi } from 'lib/hooks'

import type { IComment, IPost } from 'types/wordpress'

const PostSlug = () => {
  const [comments, setComments] = useState<IComment[]>()
  const [update, setUpdate] = useState(false)

  const router = useRouter()
  const { slug } = router.query
  const { data: posts } = useWordpressApi<IPost[]>(`posts?slug=${slug}`, [slug])
  const post = posts?.[0]

  useEffect(() => {
    if (post) {
      ky.get(`comments?post=${post?.id}`, {
        prefixUrl: config.cmsApiUrl,
        headers: {
          authorization: config.cmsApiAuthorization,
        },
      })
        .json<IComment[]>()
        .then(setComments)
        .catch(() => {})
    }
  }, [post, update])

  const commentHandler = () => {
    setUpdate(!update)
  }

  return (
    <>
      <Head title={post?.title.rendered} />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        {post && (
          <>
            <div className='w-full text-2xl font-medium'>{post.title.rendered}</div>
            <PostInfo post={post} />
            <PostCategories postId={post.id} />
            <div
              className='wp-content'
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></div>
            <hr className='w-full my-2 border-b border-gray-200' />
            <CommentForm postId={post.id} onComment={commentHandler} />
            <hr className='w-full my-2 border-b border-gray-200' />
            {comments?.map((comment) => (
              <>
                {update}
                <Comment key={comment.id} comment={comment} />
              </>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default PostSlug
