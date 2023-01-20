const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
require('dotenv').config();

// DB Setup
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var corsOptions = {
  origin: "*",
};

const app = express();

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Inject All Routes link
require("./app/routes/employee.routes")(app);
require("./app/routes/internship.routes")(app);
require("./app/routes/grade.routes")(app);
require("./app/routes/position.routes")(app);
require("./app/routes/technology.routes")(app);
require("./app/routes/qualification.routes")(app);
require("./app/routes/candidate.routes")(app);

// Cafe App
require("./app/routes/user.routes")(app);
require("./app/routes/cafeDelight/table.routes")(app);
require("./app/routes/cafeDelight/menu.routes")(app);
require("./app/routes/cafeDelight/rawMaterial.routes")(app);
require("./app/routes/cafeDelight/waiter.routes")(app);
require("./app/routes/cafeDelight/order.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
