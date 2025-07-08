import { useNavigate } from "react-router-dom";

const CalenderBox = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/weakCalender`);
        console.log(``);
      }}
      className=" w-[14rem] h-[11rem] sm:w-[18rem] sm:h-[14rem]  flex flex-col mb-5 justify-between p-1 transform hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <img
        className="w-[100%] h-[100%]   object-cover overflow-y-hidden shadow-black shadow-2xl rounded-2xl"
         src={"/weakCalender.png"}
        alt="#"
        srcSet=""
      />
      <div className=" w-[14rem] sm:w-[16rem] bottom-8  flex flex-col  p-0 ">
        <div className="z-999 font-sans   font-bold  text-sm sm:text-2xl ">
          {}
        </div>
      </div>
    </div>
  );
};

export default CalenderBox;
