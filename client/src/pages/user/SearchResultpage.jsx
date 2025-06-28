import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout.jsx";
import { useSearch } from "../../context/Search";
import { useTheme } from "../../context/Theme.jsx";


const SearchResultpage = () => {
    const [values] = useSearch()
    const navigate = useNavigate()
    const {theme} = useTheme()
    console.log("hehekjher" , values.result)
  return (
    <Layout>

    
    <div className={` ${theme === 'night' ? "bg-black text-amber-100" : "bg-white"} min-h-screen h-full`}>
        <p>Total Items found {values.result.length}</p>
        <div className={` w-screen h-full flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4`}>
          {values.result.map((m,i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className="  aspect-[4/6] bg-transparent flex flex-col ">
                    <img 
                        className="w-full h-[80%] object-cover"
                        src={m.posterURL} alt="#" srcSet=""
                    />

                    <div className="w-[100%] bg-transparent flex flex-col p-2 justify-around">
                        <div className="font-sans font-bold text-2xl">{m.name}</div>
                        <div className="font-sans font-light text-1xl">Type: {m.genre}</div>
                        <div className="flex justify-between mt-2">
                          <div className="font-sans font-light text-1xl">Rating: ⭐⭐⭐⭐⭐</div>
                          <button className="w-[35%] h-9 sm:aspect-video  p-1 bg- text-red-600 border-red-600 border-1  rounded-2xl md:rounded-4xl hover:bg-red-500 hover:text-white">Book</button>
                        </div>
                    </div>                                  

                </div>
              ))}
        </div>
    </div>
    </Layout>
  )
}

export default SearchResultpage
