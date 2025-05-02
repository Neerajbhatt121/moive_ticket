import dotenv from "dotenv"
import nodemailer from "nodemailer"
dotenv.config()

const sendMail = async (req, res, mailData) => {
    console.log("jkdsfhk",mailData)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ideapad464@gmail.com",
        pass: "adeh owke aifr gnwq",
      },
    })

        console.log(`${mailData.email}`)
        console.log("jkdsfhk",mailData)
        console.log("kjhsdfjash")
    const info = await transporter.sendMail({
      from: 'Movie Ticket App" <ideapad464@gmail.com>', // sender email jo mail bhej raha hai
      to: mailData.email,
      subject: "Your Movie Ticket Invoice",
      text: "Thank you for booking!",
      html: `<h3>Hello ${mailData.email},</h3>
                   <p>Your ticket for ${
                     mailData.moviename
                   } has been successfully booked.</p>
                   <p>Seats: ${mailData.seatNumbers}</p>
                   <p>Date: ${mailData.date}, Slot: ${mailData.slotTime}</p>
                   <p>Total: ₹${mailData.totalAmount}</p>`,

        attachments: [
            {
                filename: mailData.fileName,
                path: mailData.filePath,
            } 
        ]
                   
    })

    console.log("Message sent: %s", info.messageId)
    // return res.status(200).send({
    //   success: true,
    //   message: "mail send",
    // })
  } catch (error) {
    console.log("error in mail sending", error)
    return res.status(500).send({
        success: false,
        message: "error catch mail send",
      })
  }
}

export default sendMail