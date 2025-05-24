import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/HeroSection";
import Layout from "../Components/Layout";

const Homepage = () => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate()

  const getMoive = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/moive/getAllmoives",
      );
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
      <div className="w-full h-full overflow-x-hidden">
      <HeroSection />

      <div className="w-full h-8 mt-8 [&>*]:rounded-3xl [&>*]:w-[7rem]  [&>*]:ml-8 [&>*]:font-sans [&>*]:text-center [&>*]:pt-1 pl-10 flex justify-items-start">
        <div className="bg-wheat text-black bg-gray-200">Most Watch</div>
        <div className="bg-black text-white">High Rated</div>
        <div className="bg-wheat text-black bg-gray-200">Latest</div>
      </div>

      {movie.length > 0 && (
        <div className="w-screen mt-30 " id="main-container">
          <div className="w-[100%]  flex flex-wrap justify-evenly ">
              {movie.map((m,i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className="w-[25rem] h-[6rem] bg-gray-100 flex ">
                    <img 
                        className="w-[5rem] h-[5rem] rounded-2xl m-2"
                        src={m.posterURL} alt="#" srcSet=""  
                    />

                    <div className="w-[100%] bg-gray-100 flex flex-col p-2 justify-around">
                        <div className="font-sans font-bold text-2xl">{m.name}</div>
                        <div className="font-sans font-light text-1xl">Type: {m.genre}</div>
                        <div className="font-sans font-light text-1xl">Rating: ⭐⭐⭐⭐⭐</div>
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
