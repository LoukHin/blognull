import { useRouter } from 'next/router'
import Link from 'next/link'

import { navMenuItems } from 'content'

const NavBar: React.FC = () => {
  const { asPath: pagePath } = useRouter()

  return (
    <div className='mb-14 z-50'>
      <div className='w-full top-0 fixed bg-white border-b border-gray-200'>
        <div className='max-w-screen-xl h-14 flex flex-row items-center justify-between mx-auto p-2'>
          <h1 className='text-4xl'>
            <span className='font-extralight'>blog</span>null
          </h1>
          <div className='flex justify-end'>
            {navMenuItems.map(({ title, path }) => (
              <Link href={path} key={title.toLocaleLowerCase()}>
                <a
                  className={`${
                    pagePath === path
                      ? 'bg-opacity-10 hover:bg-opacity-20'
                      : 'bg-opacity-0 hover:bg-opacity-10'
                  } flex justify-center items-center mx-1 px-4 py-2 duration-150 text-sm font-medium rounded-lg bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  {title}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
