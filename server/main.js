const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const databaseConfiguration = require("./configurations/database")
const todo = require("./routes/todoroutes")
const userRoutes = require("./routes/userroutes")

const dotenv= require("dotenv");

dotenv.config();

const app= express();

const PORT = process.env.PORT || 4000;


//Connecting to the MongoDB database
databaseConfiguration();

//Adding cors
app.use(cors({ origin: true, credential: true}));

//body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(bodyParser.json()); 
// Add the middlewares
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is up and running")
})

//Routes
  // using the todo routes
app.use("/api/todoapp", todo);

  //user routes
app.use("/api/user", userRoutes)

//listen for requests
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})