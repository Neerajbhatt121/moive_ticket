import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/Theme";

const CalenderBox = () => {
  const navigate = useNavigate();
  const {theme} = useTheme()
  return (
      <img
      onClick={() => {
        navigate(`/weakCalender`);
      }}
        className={`w-[4rem] h-[4rem] sm:w-[7rem] sm:h-[7rem]  ${
              theme === "night"
                ? "filter invert brightness-100"
                : "filter grayscale-0 shadow-black  shadow-2xl"
            }  object-cover rounded-2xl`}
         src={"/calenderIcon.png"}
        alt="#"
        srcSet=""
      />
   // </div>
  );
};

export default CalenderBox;
