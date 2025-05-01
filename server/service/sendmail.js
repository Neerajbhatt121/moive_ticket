import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config()

const sendMail = async(req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ideapad464@gmail.com",
                pass: "adeh owke aifr gnwq"
            }
        })

        const info = await transporter.sendMail({
            from: '"Movie Ticket App" <your_email@gmail.com>', // sender
            to: "bhaiaajkyahua@gmail.com",
            subject: 'Your Movie Ticket Invoice',
            text: 'Thank you for booking!',
            html: `<h3>Hello bhaiaajkyahua@gmail.com,</h3>
                   <p>Your ticket for moivename.name has been successfully booked.</p>
                   <p>Seats: seatNumber.join(', ')}</p>
                   <p>Date: {show.date.toDateString()}, Slot: {show.slotTime}</p>
                   <p>Total: ₹{show.price * seatNumber.length}</p>`
          });
      
          console.log("Message sent: %s", info.messageId);
          return res.status(200).send({
            success: true,
            message: "mail send"
          });

    } catch (error) {
        console.log("error in mail sending", error)
    }
} 

export default sendMail;