import useInfoModal from '@/hooks/useInfoModal';
import { useRouter } from 'next/router';
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import {BiChevronDown} from 'react-icons/bi'
import FavouriteButton from './favouriteButton';
interface MovieCardProps{
  data: Record<string, any>,
}

const MovieCard: React.FC<MovieCardProps> = ({data})=>{
  const router = useRouter();
  const {openModal} = useInfoModal();
  return(
    <div className='group bg-zinc-900 col-span relative h-[12vw]'>
      <div className='text-white bg-zinc-800 rounded'>
      <img className='rounded-md cursor-pointer transition object-cover shadow-xl duration group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]' src={data?.thumbnailUrl} alt="thumbnail" />
          <p className='p-1 m-1'>
            {data?.title}
          </p>
        </div>

      <div className='opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'>
        <img className='cursor-pointer object-cover transition duration rounded-t-md shadow-xl w-full h-[12vw]' src={data?.thumbnailUrl} alt="thumbnail" />
        <div className='bg-zinc-800 z-10 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
          <div className='flex flex-row items-center gap-3'>
            <div onClick={()=>{router.push(`/watch/${data?.id}`)}} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <BsFillPlayFill size={30}/>
            </div>
            <FavouriteButton movieId={data?.id}/>
            <div onClick={()=>openModal(data?.id)} className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
              <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300 w-4"/>
            </div>
          </div>
            <p className='text-green-400 font-semibold mt-4'>
              New <span className='text-white'>
                2023
              </span>
            </p>

            <div className='flex flex-row mt-2 gap-2 items-center'>
              <p className='text-white text-[12px] lg:text-sm'>
                {data?.duration}
              </p>

            </div>
            <div className='flex flex-row mt-1 gap-2 items-center'>
              <p className='text-white text-[12px] lg:text-sm'>
                {data?.genre}
              </p>

            </div>
        </div>
      </div>
    </div>

  )
}

export default MovieCard;