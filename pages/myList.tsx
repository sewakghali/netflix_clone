import React from "react";
import MovieList from "@/components/movieList";
import Navbar from "@/components/navbar";
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useFavourites from "@/hooks/useFavourites";

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


const MyList = ()=>{
  const {data: movies=[]} = useFavourites();
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

export default MyList;