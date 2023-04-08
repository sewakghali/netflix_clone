import React from "react";
import MovieList from "@/components/movieList";
import Navbar from "@/components/navbar";
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useMovieList from "@/hooks/useMovieList";

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


const NewMovies = ()=>{
  const {data: movies=[]} = useMovieList();
  return (
    <>
    <Navbar/>
    <br />
    <br />
    <br />
    <div className="pb-40">
      <MovieList data={movies} title={``}/>
    </div>
    </>
  )
}

export default NewMovies;