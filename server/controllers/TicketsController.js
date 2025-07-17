import Ticket from "../modal/Ticket.js";
export const GetAllTicketsOfUser = async (req, res) => {
    try {
        const {userId} = req.params;
        console.log("..........", userId )
        const tickets = await Ticket.find({userId}).select("price seatNumbers").populate({
            path: "showId",
            select: "_id date",
            populate:({
                path: "movie",
                select: "posterURL name"
            })
        })
        if(tickets){
            res.status(200).send({
                success: true,
                message: "Tickets getted sucessfully",
                tickets
            })
        }
    } catch (error) {
        console.log("Error while getting tickets ........ ", error)
    }
}