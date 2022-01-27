const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/EmployeeDetails";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
    } catch (err) {
        console.log(err.message);
    }
};
connectDB();

module.exports = connectDB;
