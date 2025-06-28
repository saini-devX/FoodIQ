import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sainidevx:5642@cluster0.bay5ehc.mongodb.net/food-del').then(() => console.log("DB Connected"));

}