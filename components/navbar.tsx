import NavbarItem from "./navbarItem";
import {BsChevronDown, BsSearch, BsBell, BsMedium} from 'react-icons/bs'
import MobileMenu from "./mobileMenu";
import AccountMenu from "./accountMenu";
import {useState, useCallback, useEffect} from 'react'
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

const TOP_OFFSET = 65;

const Navbar = ()=>{
  const {data: user} = useCurrentUser();
  const [showBg, setShowBg] = useState(false);
  const [showMobMenu, setShowMobMenu] = useState(false);
  const toggleMobMenu = useCallback(()=>{
    setShowMobMenu(current=>!current);
  },[])
  const [showAccMenu, setShowAccMenu] = useState(false);
  const toggleAccMenu = useCallback(()=>{
    setShowAccMenu(current=>!current);
  },[])

  useEffect(()=>{
    const handleScroll = ()=>{
      if(window.scrollY >= TOP_OFFSET )
      setShowBg(true);
      else setShowBg(false);
    }

    window.addEventListener('scroll', handleScroll);

    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return(
    <nav className={`w-full fixed z-40`}>
      <div className={`px-4 lg:px-16 py-6 flex flex-row items-center transition duration-50 ${showBg ? 'bg-zinc-900/90' : 'bg-opacity-0'} transition`}>
        <img className="h-4 lg:h-7" src="images/logo.png" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem href="/" label="Home"/>
          <NavbarItem href="/series" label='Series'/>
          <NavbarItem  href="/films" label='Films'/>
          <NavbarItem href="/newMovies" label='New & Popular'/>
          <NavbarItem href="/myList"label='My List'/>
          <NavbarItem href="/language" label='Browse by language'/>
        </div>
        <div onClick={toggleMobMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobMenu? 'rotate-180' : 'rotate-0'}`}/>
          <MobileMenu visible={showMobMenu}/>
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <Link href={'/search'} passHref legacyBehavior>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch/>
          </div>
          </Link>
          <Link href={'/alert'} passHref legacyBehavior>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell/>
          </div>
          </Link>

          <div onClick={toggleAccMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccMenu? 'rotate-180' : 'rotate-0'}`}/>
            <AccountMenu visible={showAccMenu} user={user?.name}/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;