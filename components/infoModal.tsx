import React, {useCallback, useState, useEffect} from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./playButton";
import FavouriteButton from "./favouriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps{
  visible?:boolean,
  onClose: any
}

const InfoModal:React.FC<InfoModalProps> = ({visible, onClose})=>{
  const [isVisible, setVisible] = useState(!!visible); //cast to bool
  const {movieId} = useInfoModal();
  const {data = {} }= useMovie(movieId);

  useEffect(()=>{
    setVisible(!!visible);
  },[visible]);

  const handleClose = useCallback(()=>{
    setVisible(false),
    setTimeout(()=>{
      onClose();
    },300)
  }, [onClose]);

  if (!visible) return null;

  return(
    <div className="z-50 transition duration-300 bg-black/80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div className={`${isVisible? 'scale-100': 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
          <div className="relative h-96">
            <video autoPlay muted loop className="w-full brightness-[60%] object-cover h-full" poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
            <div onClick={handleClose} className='cursor-pointer absolute z-10 top-3 right-3 h-10 w-10 rounded-md bg-black/70 flex items-center justify-center'>
              <AiOutlineClose className="text-white" size={25}/>
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-8">
              {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavouriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">
              New
            </p>
            <p className="text-white text-lg">
              {data?.duration}
            </p>
            <p className="text-white text-lg">
              {data?.genre}
            </p>
            <p className="text-white text-lg">
              {data?.description}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal;