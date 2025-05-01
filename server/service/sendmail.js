import nodemailer from 'nodemailer';
dotenv.config()

const sendMail = async({to, subject, text, html}) => {
    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ideapad464@gmail.com",
                pass: SENDER_MAIL_PASS
            }
        })
    } catch (error) {
        
    }
} 

export default sendMail;