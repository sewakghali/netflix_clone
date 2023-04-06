import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieList from "@/components/movieList"
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModal from "@/components/infoModal";
import useInfoModal from "@/hooks/useInfoModal";

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

export default function Home() {
  const {data: movies=[]} = useMovieList();
  const {data:favourites=[]} = useFavourites(); 
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
    <Navbar/>
    <Billboard/>
    <div className="pb-40">
      <MovieList data={movies} title={`Trending Now`}/>
      <MovieList data={favourites} title={`My List`}/>
    </div>
    </>
  )
}
