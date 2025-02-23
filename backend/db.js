import mongoose from "mongoose";

mongoose.set("strictQuery", false)

// "mongodb://user:password@localhost:3000/radar_app"
const connection = async () => {
    const uri = `mongodb://${process.env.MONGO_BACKEND_USER}:${process.env.MONGO_BACKEND_PASSWORD}@localhost:${process.env.MONGO_PORT}/radar_app`
    console.log(uri)
    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    } catch (error) {
        console.log("could not connect to MongoDB" + error);
    }
}
export default connection;