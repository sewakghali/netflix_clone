import { useRouter } from 'next/router';
import React from 'react';

interface NavbarItemProps{
  label: string,
  href: string,
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label, href
})=>{
  const router = useRouter();
  return(
    <div onClick={()=>{router.push(href)}} className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  )
}

export default NavbarItem;