import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useTheme } from "../context/Theme";

const images = [
  "https://wallpaperaccess.com/full/7965055.jpg",
  "https://wallpapers.com/images/high/1920-x-1080-avengers-cbaqm04vmrlmbr31.webp",
  "https://images4.alphacoders.com/132/thumbbig-1326785.webp",
  "https://images3.alphacoders.com/134/thumb-1920-1342304.jpeg",
];

const HeroSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const {theme, } = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((currentIdx + 1) % 3);
      setDirection(1);
    }, 3000);
    return () => clearInterval(interval);
  });

  const varients = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -300,
      opacity: 1,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 1,
    }),
  };

  return (
    <div className={`${theme === 'night' ? "bg-black " : "bg-white"}  w-screen flex flex-col`}>
      <div className={` ${theme === 'night' ? "bg-black " : "bg-white"} w-[100%] aspect-[25/10] sm:aspect-[25/8] my-2  flex overflow-hidden`}>
          <div
          className='w-[100%]  aspect-[25/10] sm:aspect-[24/8] absolute left-0 top-18 z-99 '
          style={{
            backgroundImage:
              "radial-gradient(ellipse, transparent,black)",
              
          }}
        ></div>
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIdx}
            className="w-[100%] h-[100%] bg-gray-300 relative object-cover overflow-hidden rounded-0xl "
            src={images[currentIdx + 1]}
            custom={direction}
            variants={varients}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
               duration: 0.5
            }}
          />
        </AnimatePresence>
            <div className="w-[40%] absolute top-[clamp(7rem,25vw,60rem)] left-[clamp(2.5rem,8vw,10rem)] text-[clamp(1rem,2.3vw,5rem)] font-extrabold font-white z-99">
              <div className="text-white">Discover Movies by Nikola Tesla</div>
              <div className="w-[40%] p-1 text-[clamp(0.3rem,1.5vw,3rem)] justify-center items-center text-center flex bg-yellow-600 font-medium rounded-2xl"><FaPlay/>. Watch Trailer</div>
            </div>
      </div>
    </div>
  );
};

export default HeroSection;
