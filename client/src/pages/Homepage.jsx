import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/HeroSection";
import Layout from "../Components/Layout";
import { useTheme } from "../context/Theme";

const Homepage = () => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate()
  const {theme} = useTheme()

  const getMoive = async () => {
    try {
      const res = await axios.get("/api/v1/moive/getAllmoives");
      setMovie(res.data.movie);
      console.log(res.data.movie);
      console.log(movie);
      toast.success("toasted")
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
    <Layout title={"All movie and shows"}>
      <div><Toaster/></div>
      <div className={`${theme === 'night' ? "bg-black text-gray-200" : "bg-white text-black"} w-full h-full overflow-x-hidden`}>
      <HeroSection />

      <div className={`w-full h-8 mt-8 [&>*]:rounded-3xl [&>*]:w-[7rem]  [&>*]:ml-8 [&>*]:font-sans [&>*]:text-center [&>*]:pt-1 flex `}>
        <div className="bg-wheat text-black bg-gray-200">Most Watch</div>
        <div className="bg-black text-white">High Rated</div>
        <div className="bg-wheat text-black bg-gray-200">Latest</div>
      </div>

      

          {movie.length > 0 && (
            
        <div className={`${theme === 'night' ? "bg-black text-white" : "bg-white text-black"} w-full   mt-20 " id="main-container`}>
          <div className="mb-10  text-2xl font-sans font-bold ml-5">
            Recently uploaded
          </div>
          <div className="w-[100%]  flex justify-evenly items-center gap-0 px-4 overflow-y-auto">
              {movie.map((m,i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className="w-[18rem] h-[16rem] bg-transparent flex flex-col mb-5 shadow-2xl p-1">
                    <img 
                        className="w-full object-cover "
                        src={m.posterURL} alt="#" srcSet=""
                    />

                    <div className="w-[100%] bg-transparent flex flex-col p-2 justify-around">
                        <div className="font-sans font-bold  text-2xl">{m.name}</div>
                        <div className="font-semibold text-1xl">Type: {m.genre}</div>
                        <div className="font-sans  text-1xl">Rating: ⭐⭐⭐⭐⭐</div>
                    </div>          

                </div>
              ))}
          </div>
        </div>
      )}


      <div className="mb-10  text-2xl font-sans font-bold ml-5">
            Recommended
      </div>

      {movie.length > 0 && (
        <div className={`${theme === 'night' ? "bg-black text-white" : "bg-white text-black"} w-full  mt-5 " id="main-container`}>
          <div className="w-[100%]  flex flex-wrap justify-evenly items-center gap-5 ">
              {movie.map((m,i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className="w-[18rem]  aspect-[4/6] bg-transparent flex flex-col ">
                    <img 
                        className="w-full h-[80%] object-cover "
                        src={m.posterURL} alt="#" srcSet=""
                    />

                    <div className="w-[100%] bg-transparent flex flex-col p-2 justify-around">
                        <div className="font-sans font-bold text-2xl">{m.name}</div>
                        <div className="font-sans font-light text-1xl">Type: {m.genre}</div>
                        <div className="flex justify-between mt-2">
                          <div className="font-sans font-light text-1xl">Rating: ⭐⭐⭐⭐⭐</div>
                          <button className="w-[35%] aspect-video] p-1 bg- text-red-600 border-red-600 border-1  rounded-4xl hover:bg-red-500 hover:text-white">Book</button>
                        </div>
                    </div>                                    

                </div>
              ))}
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default Homepage;
