import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import MovieCard from '@/components/movieCard';
import useMovieList from '@/hooks/useMovieList';
import { useRouter } from 'next/router';
import useSearch from '@/hooks/useSearch';

import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);
  if(!session){
    return{
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

const Search = () => {
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  const [search, setSearchVal] = useState('');
  const {data, error, mutate} = useSearch(search);
  const submitForm = (e: any) => {
    e.preventDefault();
    // if (error) {
    //   return (<>
    //     <Error statusCode={404}></Error>
    //   </>);
    // }
  }

  useEffect(()=>{
    setSearchVal(search);
  },[search, data, error]);
  
  return (
    <>
    <Navbar/>
    <br />
    <br />
    <br />
    <div className='px-4 md:px-12  mt-4 space-y-8'>
      <form className='p-1'  onSubmit={submitForm}>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-white">
            </div>
            <input aria-label='Search' placeholder='search movies/shows' value={search} onChange={(e)=> setSearchVal(e.target.value)} className="block w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>
      <div className='grid grid-cols-4 gap-2'>
        {data? data.map((movie: any) => (
          <div key={movie?.id} className=' '>
            <MovieCard data={movie} />
          </div>
        )) : null}
      </div>
    </div>
    </>
  )
}

export default Search;