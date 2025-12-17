require("dotenv").config();
const cors = require("cors");
const express = require('express');
const app = express();
app.use(cors({
  origin: "*",
  credentials: true
}));
const connectToMongo = require('./db.js');
connectToMongo(); 




app.use(cors()); 
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))

app.listen(port,() =>{
    console.log(`On port ${port}`)
}) 



