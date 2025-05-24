import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "https://wallpaperaccess.com/full/7965055.jpg",
  "https://wallpapers.com/images/high/1920-x-1080-avengers-cbaqm04vmrlmbr31.webp",
  "https://images4.alphacoders.com/132/thumbbig-1326785.webp",
  "https://images3.alphacoders.com/134/thumb-1920-1342304.jpeg",
];

const HeroSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);

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
    <div className="w-screen flex flex-col  ">
      <div className="w-[100%] aspect-[27/8] bg-white mx-0 my-5 rounded-2xl flex overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIdx}
            className="w-[10%] h-[100%]  bg-gray-300 object-cover overflow-hidden rounded-br-xl rounded-tr-xl"
            src={images[currentIdx % 4]}
            custom={direction}
            variants={varients}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              //  duration: 0.1
            }}
          />
        </AnimatePresence>

        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIdx}
            className="w-[100%] h-[100%] bg-gray-300 object-cover overflow-hidden rounded-0xl ml-10 mr-10"
            src={images[currentIdx + 1]}
            custom={direction}
            variants={varients}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              // duration: 0.1
            }}
          />
        </AnimatePresence>
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIdx}
            className="w-[10%] h-[100%] object-cover overflow-hidden rounded-bl-xl rounded-tl-xl"
            src={images[(currentIdx + 2) % 4]}
            custom={direction}
            variants={varients}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
            }}
          />
        </AnimatePresence>
      </div>
      <div className="w-screen h-10 flex justify-center    ">
        {images.map((_, i) => (
          <span
            key={i}
            className={
              i === currentIdx ? "mx-1 text-purple-500" : "mx-1 text-gray-400"
            }
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
