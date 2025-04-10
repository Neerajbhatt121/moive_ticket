import chalk from "chalk";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(chalk.green.bold(`connected to mongodb ${connect.connection.host}`));
    } catch (error) {
        console.log(process.env.MONGO_URL)
        console.log(chalk.red("Can't connect to Database"))
        console.log(error)
    }
}