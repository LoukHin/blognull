import { useRouter } from 'next/router'

import Head from 'components/head'
import PostCategories from 'components/categories'
import PostInfo from 'components/post-info'
import Comment from 'components/comment'
import CommentForm from 'components/comment-form'
import { useWordpressApi } from 'lib/hooks'

import type { IComment, IPost } from 'types/wordpress'

const PostSlug = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: posts } = useWordpressApi<IPost[]>(`posts?slug=${slug}`, [slug])
  const post = posts?.[0]
  const { data: comments } = useWordpressApi<IComment[]>(`comments?post=${post?.id}`, [post?.id])

  return (
    <>
      <Head title={post?.title.rendered} />
      <div className='max-w-screen-md mx-auto py-3 flex flex-row flex-wrap'>
        {post && (
          <>
            <div className='w-full text-2xl font-medium'>{post.title.rendered}</div>
            <PostInfo postId={post.id} />
            <PostCategories postId={post.id} />
            <div className='wp-content' dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
            <hr className='w-full my-2 border-b border-gray-200' />
            <CommentForm postId={post.id} />
            <hr className='w-full my-2 border-b border-gray-200' />
            {comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default PostSlug
