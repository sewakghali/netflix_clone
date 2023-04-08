import React from "react";
import Navbar from "@/components/navbar";
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


const Series = ()=>{
  return (
    <>
    <Navbar/>
    <br />
    <br />
    <br />
    <div className="px-4 md:px-12  mt-4 space-y-8">
      <div className="mb-4 bg-zinc-800 rounded-md h-[80vh] pb-10 flex items-center justify-center">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold" >No Series at this moment.<br/><span className="text-yellow-500">Please Check Back Later</span></p>
      </div>
    </div>
    </>
  )
}

export default Series;