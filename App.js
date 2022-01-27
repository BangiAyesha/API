const express = require("express");
const app = express();
const port = 9000;
const connectDB = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

const postRoutes = require("./routes/employeeRoutes");
app.use(postRoutes);

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${port}`);
});
