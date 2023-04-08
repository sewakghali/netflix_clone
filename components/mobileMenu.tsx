import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  visible?: boolean,
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  const router = useRouter();
  return (
    <div className='bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex'>
      <div className='flex flex-col gap-4'>
        <Link passHref legacyBehavior href={'/'}>
          <div className='px-3 text-cen
         text-white hover:underline'>
            Home
          </div>
        </Link>
        <Link passHref legacyBehavior href={'/series'}>
          <div className='px-3 text-cen
         text-white hover:underline'>
            Series
          </div>
        </Link>
        <Link passHref legacyBehavior href={'/films'}>
          <div className='px-3 text-cen
         text-white hover:underline'>
            Films
          </div>
        </Link>
        <Link passHref legacyBehavior href={'newMovies'}>
          <div className='px-3 text-cen
         text-white hover:underline'>
            New and Popular
          </div>
        </Link>
        <Link passHref legacyBehavior href={'/myList'}>
          <div className='px-3 text-cen
         text-white hover:underline'>
            My List
          </div>
        </Link>
        <Link passHref legacyBehavior href={'/language'}>
          <div className='px-3 text-cen
         text-white hover:underline'>
            Browse by Language
          </div>
        </Link>
      </div>

    </div>
  )

};

export default MobileMenu;