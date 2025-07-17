import mongoose from "mongoose";
import { default as Moive, default as movie } from "../modal/Moive.js";
import ShowInstance from "../modal/ShowInstance.js";
import Tickets from '../modal/Ticket.js';
import user from "../modal/User.js";
import { InvoiceGenerater } from "../service/Invoice.js";
import sendMail from "../service/sendmail.js";


// POST --  Create Show Instances
export const CreateShowInstances = async (req, res) => {
    try {
        console.log(req.body)
        const {movie,date, slotTime, bookedSeats} = req.body;
        const show = new ShowInstance({
            movie,
            date,
            slotTime,
            bookedSeats: generateSeats(),
        })
        await show.save();
        return res.status(201).send({
            success: true,
            message: "Instance Created Successfully",
            show
        })
    } catch (error) {
        console.log("Error while create the Instance", error)
        return res.status(500).send({
            success: false,
            message: "Error while creating the instance"
        })
    }
}

// GET -- Get the instance for that particular day
export const GetInstanceForDay = async (req,res) => {
    try {
        const {date} = req.params;
        console.log(req.params,"ppppppppppppppppppp")
        const instance = await ShowInstance.find({date})
        if(!instance ){
            console.log("nahi mila instance")
        }
        return res.status(200).send({
            success: true,
            message: "we get it",
            instance
        })
    } catch (error) {
        console.log("Can't get the Instance for the day", error)
        return res.status(500).send({
            success: true,
            message: "can't find the instance for the particular day"
        })
    }
}

// GET -- Get the instance for the particular moive within i upcoming 7 days
export const GetInstanceForMoive = async (req,res) => {
    try {
        const movieId = req.params.movId;
        const today = new Date;
        const next7Day = new Date;
        next7Day.setDate(today.getDate() + 7)
            console.log("look Here ...............................", movieId , "........")
            console.log(today, "   ", next7Day)
        const instance = await ShowInstance.find({
            movie: new mongoose.Types.ObjectId(movieId),
            date: {$gte: today, $lte: next7Day}
        })

        console.log("..................", instance)

        if(!instance){
            console.log("no moive instance found")
            return res.status(200).send({
                success: true,
                message: "No instance found"
            })
        }
        console.log(instance, movieId, req.params)
        return res.status(200).send({
            success: true,
            message: "movie instance founded",
            instance
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while finding the instance for the particular moive for next 7 days"
        })
    }
}

export const GetThisWeakShows = async (req,res) => {
    try {
        const today = new Date;
        const next7Day = new Date;
        next7Day.setDate(today.getDate() + 7)

        const instance = await ShowInstance.find({
            date: {$gte: today, $lte: next7Day}
        }).select("-bookedSeats")

        if(!instance){
            console.log("no moive instance found")
            return res.status(200).send({
                success: true,
                message: "No instance found"
            })
        }

        const insMovId = await Promise.all(
            instance.map(id => Moive.findById(id.movie).select("posterURL")))

        const result = instance.map((e, i) => {
            const obj = e.toObject(); // important!
            obj.posterURL = insMovId[i]?.posterURL || null;
            obj.insId = e._id
            return obj;
        });

        const uniqueMoviesMap = new Map();

result.forEach((item) => {
  const movieId = item.movie.toString(); // convert ObjectId to string for consistency
  if (!uniqueMoviesMap.has(movieId)) {
    uniqueMoviesMap.set(movieId, item); // store the first instance of the movie
  }
});

const filtered = Array.from(uniqueMoviesMap.values());

        console.log("moviId currrrrrrrrrr", filtered)
        return res.status(200).send({
            success: true,
            message: "movie instance founded",
            result,
            filtered
        })

    } catch (error) {
        console.log(error)
        return res.statumovies(500).send({
            success: false,
            message: "Error while finding the thsi weak shows"
        })
    }
}

export const GetInstanceForMoiveEachDay = async (req,res) => {
    try {
        const {movId, date} = req.params;
        console.log(req.params)

        const instance = await ShowInstance.find({
            movie: movId,
            date: date
        });

        if(!instance || instance.length === 0) {
            console.log("No movie instance found");
            return res.status(200).send({
                success: true,
                message: "No instance found",
                instance: []
            });
        }
        console.log(instance, movId, req.params)
        return res.status(200).send({
            success: true,
            message: "movie instance founded",
            instance
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while finding the instance for the particular moive for next 7 days"
        })
    }
}


export const GetInstanceCheck = async (req,res) => {
    try {
        const {movId, date, slotTime} = req.params;
        console.log("here all params",req.params)

        const instance = await ShowInstance.find({
            movie:movId,
            slotTime: slotTime,
            date: date,
        });

        console.log("Filtered instance by slotTime:", instance);

        if (!instance || instance.length === 0) {
            console.log("No movie instance found", instance)
            return res.status(200).send({
                success: true,
                message: "No instance found",
                instance: instance
            });
        }
        console.log(instance, movId, req.params)
        return res.status(200).send({
            success: true,
            message: "movie instance founded",
            instance
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while finding the instance for the particular moive for next 7 days"
        })
    }
}

// Create 50 seats with seatNumber like A1, A2, ..., E10 (for example)
const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        seats.push({
          seatNumber: `${row}${i}`,
          isBooked: false,
          bookedBy: null,
          bookedAt: null
        });
      }
    });
    return seats;
  };

// GET -- Get the Instance by Id
export const GetShowInstanceBySlotTimeAndDate = async (req, res) => {
    console.log("params", req.params)
    try {
        const { date, slotTime} = req.params;
        console.log("here all params",req.params)

        const instance = await ShowInstance.find({
            slotTime: slotTime,
            date: date,
        });

        console.log("Filtered instance by slotTime:", instance);

        if (!instance || instance.length === 0) {
            console.log("No movie instance found", instance)
            return res.status(200).send({
                success: true,
                message: "No instance found",
                instance: instance
            });
        }
        console.log(instance, req.params)
        return res.status(200).send({
            success: true,
            message: "movie instance founded",
            instance
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while finding the instance for the particular date and slot"
        })
    }

}

// POST -- Book the seat 
export const PostBookSeat = async (req, res) => {
    try {
        const { showId, seatNumber, userId } = req.body; 
        console.log("body",req.body)
        const User = await user.findOne({email: userId})
        if (!User) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        console.log("all things",showId, seatNumber, User._id)
        const show = await ShowInstance.findById(showId)
        const moivename = await movie.findById(show.movie)
      //  console.log("all things",moivename,show)
        if(!show) {
            return res.status(404)
            .json({
                success: false,
                message: "Show is not found"
            })
        }

        const notFoundSeats = []
        const alreadyBookedSeat = []

        seatNumber.forEach(seatNumber => {
            const seat = show.bookedSeats.find(seat => seat.seatNumber === seatNumber)
            if (!seat) {
                notFoundSeats.push(seatNumber)
            } else if(seat.isBooked){
                alreadyBookedSeat.push(seatNumber)
            } else {
                seat.isBooked = true;
                seat.bookedBy =  User._id // userId;
                seat.bookedAt = new Date();
            }
        })

        if (notFoundSeats.length > 0) {
            return res.status(404).json({ success: false, message: `Seats not found here: ${notFoundSeats.join(', ')}` });
          }
      
          if (alreadyBookedSeat.length > 0) {
            return res.status(400).json({ success: false, message: `Seats already booked here: ${alreadyBookedSeat.join(', ')}` });
          }

        const ticketResult = await ticketGenerated({
            User,
            showId,
            seatNumber,
            price : show.price * seatNumber.length
        })
        console.log("ticket -->>", ticketResult)
        if (!ticketResult.success) {
            return res.status(500).send({
                success: false,
                message: "Seat booked but ticket creation failed"
            });
        }

        const invoiceGen = await InvoiceGenerater({
            bookingId: ticketResult.ticket._id,
            username: User.name,
            email: User.email,
            moviename: moivename.name,
            date: show.date.toDateString(),
            slotTime: show.slotTime,
            seatNumbers: seatNumber,
            totalAmount: show.price * seatNumber.length
        })

            console.log("hereeeee",invoiceGen)
        const mailed = await sendMail(req, res,{
            email: User.email,
            moviename: moivename.name,
            seatNumbers: seatNumber,
            date: show.date.toDateString(),
            slotTime: show.slotTime,
            totalAmount: show.price * seatNumber.length,
            filePath: invoiceGen.filePath,
            fileName: invoiceGen.fileName
        })
        
        await show.save();
        console.log("invoiceGen", invoiceGen)
        return res.status(200).send({
            success: true,
            message: "Seat booked successfully",
            invoiceUrl: invoiceGen.publicUrl,
            show
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error here in catch"
        })
    }
}


// POST -- Generating the Ticket
export const ticketGenerated = async ({ User, showId, seatNumber, price }) => {
    try {
        console.log()
        if(seatNumber.length < 0) 
            return res.status(500).send({
                success:false,
                message: "seats are empty"
        })
        const newTicket = new Tickets({
            userId: User._id,
            showId: showId,
            seatNumbers: seatNumber,
            price,
        });

        console.log("Ticket before saving:", newTicket);
         await newTicket.save();
        console.log("ticket generated logs")
        return { success: true, ticket: newTicket };
    } catch (error) {
        console.log("Ticket creation failed:", error);
        return { success: false, message: "Ticket creation failed"};
    }
}