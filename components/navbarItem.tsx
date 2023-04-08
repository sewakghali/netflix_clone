import React from 'react';
import Link from "next/link";

interface NavbarItemProps{
  label: string,
  href: string,
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label, href
})=>{
  return(
    <Link passHref legacyBehavior href={href}>
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
    </Link>
  )
}

export default NavbarItem;