import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://dhakatopi:dhakatopi@cluster0.ynu4u.mongodb.net/dhakatopi?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //   useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline);
    process.exit(1);
  }
};

export default connectDB;
