import mongoose from 'mongoose';

const DB_URI = process.env.MONGO_DB_CNN || "";

const connect = async () => {
    await mongoose.connect(DB_URI);
    console.log("Base de datos en línea!");
}

export default connect;
