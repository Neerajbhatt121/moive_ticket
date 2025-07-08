import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../../context/Auth";
import { useTheme } from "../../context/Theme";
import { socket } from "../socket";

const WeakCalender  = () => {
  const [resMov, setResMov] = useState();
  const [instaceDate, setInstanceDate] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [instanceRes, setInstanceRes] = useState();
  const [liveLockedSeats, setLiveLockedSeats] = useState([]);
  const { auth } = useAuth();
  const { theme } = useTheme();
  const [instaceSlotIdx, setInstanceSlotIdx] = useState(0);
  const [instaceSlot, setInstanceSlot] = useState('morning');
  const [movId, setmovId] = useState()

  const dates = [];
   const slot = ["morning", "afternoon", "evening", "night"];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/moive/getMovieById/${movId ? movId : null}`,
      );
      // console.log("data here", response.data)
      setResMov(response.data.movie);
      console.log(resMov);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [movId]);

  // socket
  useEffect(() => {
    if (!instanceRes?._id) return;

    // Join specific room for this movie instance
    socket.emit("joinInstance", instanceRes._id);

    // Receive real-time updates of selected seats
    socket.on("seatSelected", ({ seatNumber }) => {
      setLiveLockedSeats((prev) => [...new Set([...prev, seatNumber])]);
    });

    socket.on("seatUnselected", ({ seatNumber }) => {
      setLiveLockedSeats((prev) => prev.filter((s) => s !== seatNumber));
    });

    return () => {
      socket.off("seatSelected");
      socket.off("seatUnselected");
      socket.emit("leaveInstance", instanceRes._id);
    };
  }, [instanceRes]);

  //   uI Seat
  const handleSeatClick = (index, s) => {
    if (selectedSeats.includes(s)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== s));
      socket.emit("unselectSeat", {
        seatNumber: s,
        instanceId: instanceRes._id,
      });
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, s]);
      socket.emit("selectSeat", {
        seatNumber: s,
        instanceId: instanceRes._id,
        userId: auth.user.email,
      });
    }
  };

  // Getting the movie instance for today
  const GettingInstance = async () => {
    try {
      const date = dates[instaceDate];
      console.log("movid" , date.toISOString().split("T")[0], instaceSlot)
      const instance = await axios.get(
        `/api/v1/instance/getInstanceDate&Time/${instaceSlot}/${
          date.toISOString().split("T")[0]
        }`
      );
      console.log("Curr instance ", instance?.data?.instance[0])
      setInstanceRes(instance?.data?.instance[0])
      setmovId(instance?.data?.instance[0]?.movie)
      console.log(instance?.data?.instance[0]?.movie)
    } catch (error) {
      console.log("Can't get the instance of movie", error);
    }
  };


  useEffect(() => {
    GettingInstance();
    setSelectedSeats([]);
    console.log("error",instaceDate, instaceSlot)
  }, [instaceDate, instaceSlot]);

  const handleClickpayment = async () => {
    try {
      const showId = instanceRes?._id;
      const seatnumber = selectedSeats;
      const userId = auth.user.email;
      console.log(showId, seatnumber, userId);
      if(seatnumber.length == 0) {
        toast.error("select seat first");
        console.log("Seat not selected")
        return;
      }
      const book = await axios.post(
        "http://localhost:5000/api/v1/instance/bookMovie",
        {
          showId: showId,
          seatNumber: seatnumber,
          userId: userId,
        },
      );
      console.log("book", book);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={` ${
        theme === "night" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } h-[100vh] p-4 flex items-center justify-center `}
    >
       <Toaster/>
      <div
        className={`  ${
          theme === "night" ? "bg-black text-white" : "bg-gray-100 text-black"
        } w-full h-[90%] flex flex-col justify-around items-center  rounded-2xl shadow-2xl shadow-black`}
      >
        <div
          className={`${
            theme === "night" ? " text-white" : " text-black"
          } text-3xl `}
        >
          🎥 Choose the Date:
        </div>
        <div className="w-full flex justify-center">
          {dates.map((m, i) => (
            <div
              key={i}
              className={`w-17 aspect-square m-1 rounded-2xl text-[10px] sm:text-[14px] font-medium text-gray-700 
                ${
                  theme === "light"
                    ? i === instaceDate
                      ? "bg-purple-400 text-white"
                      : "bg-gray-100 shadow-2xl"
                    : i === instaceDate
                      ? "border-purple-400 border-2 text-purple-500"
                      : "border-gray-400 border-2 text-gray-200 shadow-2xl"
                }
              flex flex-col justify-center items-center`}
              onClick={() => setInstanceDate(i)}
            >
              <div>{m.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className="text-center">
                {m.getDate()}{" "}
                {m.toLocaleDateString("en-US", { month: "short" })}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col flex-wrap items-center  gap-5 ">
          <div className="">
            <span>
              show timing :-{" "} 
              {instanceRes?.instance &&
              instanceRes.instance.length > instaceSlotIdx &&
              instanceRes.instance[instaceSlotIdx]?.slotTime 
                ? instanceRes.instance[instaceSlotIdx].slotTime
                : "No Show Found"}
            </span>
            <div className="w-full flex justify-center">
              {slot.map((m, i) => (
                <div
                  key={i}
                  className={`w-17 aspect-video m-2 rounded-[14px] text-[8px] font-medium text-gray-700 
                ${
                  theme === "light"
                    ? i == instaceSlotIdx
                      ? "bg-purple-400 text-white"
                      : "bg-gray-100 shadow-2xl"
                    : i == instaceSlotIdx
                      ? "border-purple-400 border-2 text-purple-500"
                      : "border-gray-400 border-2 text-gray-100 shadow-2xl"
                }
              flex flex-col justify-center items-center`}
                  onClick={() => {
                    setInstanceSlotIdx(i)
                    setInstanceSlot(slot[i])
                  }}
                >
                  <div>{slot[i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-around flex-wrap ">
            {/* Details */}
            <div
              className={` ${
                theme === "night" ? "bg-black  " : " bg-gray-100"
              } w-[30rem] h-[6rem]  flex mb-3 rounded-2xl shadow-2xl`}
            >
              <img
                className="w-[5rem] h-[5rem] rounded-2xl m-2"
                src={resMov ? resMov?.posterURL : ""}
                alt="#"
                srcSet=""
              />
              <div
                className={` ${
                  theme === "night" ? "bg-black" : " bg-gray-100"
                } w-full  flex flex-col p-2 justify-around  rounded-2xl shadow-2xl`}
              >
                <div className="font-sans font-bold text-2xl">
                  {resMov?.name}
                </div>
                <div className="font-sans font-light text-1xl truncate line-clamp-1 whitespace-break-spaces">
                   {resMov?.genre}
                </div>
                <div className="font-sans font-light text-1xl">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-10">
              <div className="w-[60%] h-5 bg-gray-400 rounded-t-full  text-center flex justify-center"></div>
              <div
                className={` ${
                  theme === "night" ? "bg-gray-950 " : "bg-[#F8F3F3]"
                } grid grid-cols-10 gap-4  p-4 rounded `}
              >
                {instanceRes? (
                    instanceRes.bookedSeats?.map((s, index) => {
                    const booked = instanceRes.bookedSeats;
                    // const isBooked = booked.includes(index)
                    const isSelected = selectedSeats.includes(
                      booked[index].seatNumber,
                    );

                    const isLiveLocked = liveLockedSeats.includes(
                      booked[index].seatNumber,
                    );

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (
                            booked[index].isBooked == false &&
                            !liveLockedSeats.includes(booked[index].seatNumber)
                          ) {
                            // booked.includes
                            handleSeatClick(index, booked[index].seatNumber);
                          }
                        }}
                        className={`w-8 h-8 rounded-md cursor-pointer text-center
                            ${
                              booked[index].isBooked
                                ? "border-2 border-red-400 text-red-400 cursor-not-allowed"
                                : isSelected
                                  ? "border-2 border-yellow-500 text-yellow-500"
                                  : isLiveLocked
                                    ? "border-2 border-blue-500 text-blue-500 cursor-not-allowed"
                                    : "border-2 border-green-800 text-green-500"
                            }
                          `}
                      >
                        {booked[index].seatNumber}
                      </div>
                    );
                  })
                ) : (
                  // 
                  <div
  className={`${
    theme === "night" ? "bg-gray-950" : "bg-[#F8F3F3]"
  } grid grid-cols-10 gap-4 p-4 rounded`}
>
  {Array.from({ length: 50 }).map((_, index) => (
    <div
      key={index}
      className="w-8 h-8 bg-gray-300 rounded-md animate-pulse"
    ></div>
  ))}
</div>
                  
                )}
              </div>
            </div>
          </div>

          <div
            className={`  w-full flex  justify-center md:justify-center lg:justify-start `}
          >
            <div
              onClick={() => {
                handleClickpayment();
              }}
              className={` ${
                theme === "night"
                  ? " border-purple-500 text-purple-500 bg-gray-950"
                  : " bg-purple-600 text-white"
              } w-80 h-10 border-1 text-center p-1 md:mx-35  rounded-xl   -top-10 hover:bg-black `}
            >
              Proceed to Payment
            </div>
          </div>
        </div>

        <div className="w-[80%] h-0.5 mt-5 bg-black " />
      </div>
    </div>
  );
};

export default WeakCalender;
