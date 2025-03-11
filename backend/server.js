const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const translationRoutes = require("./routes/translationRoutes");
require("./config/db");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", translationRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
