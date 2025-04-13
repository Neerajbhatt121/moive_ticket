import ShowInstance from "../modal/ShowInstance.js";

// POST --  Create Show Instances
export const CreateShowInstances = async (req, res) => {
    try {
        console.log(req.body)
        const {movie,date, slotTime, bookedSeats} = req.body;
        const show = new ShowInstance({
            movie,
            date,
            slotTime,
            bookedSeats,
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
        const {date} = req.body;
        console.log(date,"khksdkfahd")
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