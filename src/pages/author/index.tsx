import Link from 'next/link'
import Image from 'next/image'

import Head from 'components/head'
import { useWordpressApi } from 'lib/hooks'

import type { IUser } from 'types/wordpress'

const Author = () => {
  const { data: users } = useWordpressApi<IUser[]>(`users`)

  return (
    <>
      <Head title='Author' />
      <div className='max-w-screen-md mx-auto py-3'>
        <span className='w-full text-2xl'>Author</span>
        <hr className='w-full my-3 border-b border-gray-200' />
        <div className='flex flex-row flex-wrap -mx-2'>
          {users?.map((user) => (
            <div key={`${user.id}`} className='w-1/3 p-2'>
              <Link href={`/author/${user.slug}`}>
                <a className='w-full'>
                  <div className='flex flex-row rounded overflow-hidden ring-1 ring-gray-200 duration-150 hover:shadow-lg hover:ring-gray-400'>
                    <div className='flex w-1/3 relative'>
                      <Image
                        src={user.avatar_urls[96]}
                        alt={`${user.name}'s avatar`}
                        width='96'
                        height='96'
                        className='flex'
                      />
                    </div>
                    <div className='flex w-2/3 content-center p-3 text-2xl font-medium'>
                      {user.name}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Author
