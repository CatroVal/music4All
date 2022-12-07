import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4C426E] py-2 p-4 mb-0 rounded-lg cursor-pointer">
    <h3 className="font-bold text-base text-white mr-3">
      {index + 1}.
    </h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        src={song?.images?.coverart}
        alt={song?.title}
        className="w-20 h-20 rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const { data } = useGetTopChartsQuery();
  const topPlays = data?.slice(0, 5);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: 'smooth' });
  });

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {
            topPlays?.map((song, index) => (
              <TopChartCard
                key={song.key}
                song={song}
                index={index}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song, index)}
              />
            ))
          }
        </div>
      </div>

      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {
            topPlays?.map((song, index) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: '25%', height: 'auto' }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} alt="name" className="rounded-full w.full object-cover" />
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
