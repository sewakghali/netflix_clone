import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import React, { useCallback, useMemo } from 'react';
import { mutate } from "swr";

interface FavouriteButtonProps {
  movieId: string,
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavs } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFav = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  },[currentUser, movieId]);

  const toggleFavs = useCallback(async () => {
    let response;
    if (isFav) {
      response = await axios.delete('/api/favourite', { data: {movieId } });
    } else {
      response = await axios.post('/api/favourite', { movieId });
    }

    const updatedFavIds = response?.data?.favouriteIds;

    mutate({
      ...currentUser,
      favouriteIds: updatedFavIds
    });

    mutateFavs();
    // return;
  }, [movieId, isFav, currentUser, mutate, mutateFavs])

  const Icon = isFav ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div onClick={toggleFavs} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white" size={25} />
    </div>
  )
}

export default FavouriteButton;
