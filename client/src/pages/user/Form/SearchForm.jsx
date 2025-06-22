import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSearch } from "../../../context/Search"
import { useTheme } from "../../../context/Theme"

const SearchForm = () => {

    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    const {theme} = useTheme()

    const handleSumit = (e) => {
        e.preventDefualt()
        try {
            const result = await axios.get('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="w-full h-[100%] ">
        <form action="submit" className="w-full h-[100%]"
            onSubmit={handleSumit}
            >
            <input 
                className={`${theme === "night" ? "bg-black text-white border-2 border-gray-700 outline-none" : "bg-gray-100 text-black outline-none "} w-full h-[100%]  px-5 rounded-3xl shadow-2xl `}
                type="search" 
                placeholder="Search Your Movie"
                value={values.keyword}
                onChange={(e) => setValues({...values, keyword: e.target.value})}
            />
        </form>
    </div>
  )
}

export default SearchForm
