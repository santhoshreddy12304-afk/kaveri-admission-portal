const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const leadsRoutes = require("./routes/leads");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leads", leadsRoutes);

app.get("/", (req, res) => {
    res.send("Admission Portal API is running...");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
