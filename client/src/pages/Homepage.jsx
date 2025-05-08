import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";

const Homepage = () => {
  const [movie, setMovie] = useState([]);

  const getMoive = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/moive/getAllmoives",
      );
      setMovie(res.data.movie);
      console.log(res.data.movie);
      console.log(movie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoive();
  }, []);

  useEffect(() => {
    console.log("Updated movie list:", movie);
  }, [movie]);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Header />
      <HeroSection />

      <div className="w-screen h-8 mt-2 [&>*]:rounded-2xl [&>*]:w-[7rem] [&>*]:ml-4 [&>*]:font-sans [&>*]:text-center [&>*]:pt-1 pl-10 flex justify-items-start">
        <div className="bg-wheat text-black bg-gray-200">Most Watch</div>
        <div className="bg-black text-white">High Rated</div>
        <div className="bg-wheat text-black bg-gray-200">Latest</div>
      </div>

      {movie.length > 0 && (
        <div className="w-screen" id="main-container">
          <div>
            <div className="w-[20rem] h-[25rem] bg-red-300 ">
              <img src={movie[1].posterURL} alt="#" srcset="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
