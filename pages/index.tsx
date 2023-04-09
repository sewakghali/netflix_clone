import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieList from "@/components/movieList"
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModal from "@/components/infoModal";
import useInfoModal from "@/hooks/useInfoModal";
import Head from "next/head";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
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
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <meta name="google-site-verification" content="phtHwikeVzIrMdg5D5NBaHgbOGZzEnnzUldKWgTNw_g" />
        <meta property="og:NetflixClone" content="Netflix Clone" key="Netflix Clone" />
      </Head>

      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title={`Trending Now`} />
        <MovieList data={favourites} title={`My List`} />
      </div>
    </>
  )
}
