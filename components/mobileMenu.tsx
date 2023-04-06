import { useRouter } from 'next/router';
import React from 'react';
import NavbarItem from './navbarItem';

interface MobileMenuProps{
  visible?: boolean,
}

const MobileMenu: React.FC<MobileMenuProps> =({visible})=>{
  if(!visible) {
    return null;
  }
  const router = useRouter();
  return(
    <div className='bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex'>
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-cen
         text-white hover:underline' onClick={()=>{router.push('/')}}>
          Home
        </div>
        <div className='px-3 text-cen
         text-white hover:underline' onClick={()=>{router.push('/')}}>
          Series
        </div>
        <div className='px-3 text-cen
         text-white hover:underline' onClick={()=>{router.push('/lol')}}>
          Films
        </div>
        <div className='px-3 text-cen
         text-white hover:underline' onClick={()=>{router.push('/')}}>
          New and Popular
        </div>
        <div className='px-3 text-cen
         text-white hover:underline' onClick={()=>{router.push('/')}}>
          My List
        </div>
        <div className='px-3 text-cen
         text-white hover:underline' onClick={()=>{router.push('/')}}>
          Browse by Language
        </div>
      </div>

    </div>
  )

};

export default MobileMenu;