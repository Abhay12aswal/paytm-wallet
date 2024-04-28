const express= require("express");
const app= express();
const cors= require("cors")

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index")

const port= 8080;


app.use("/api/v1", mainRouter);




app.listen(port,()=>{
    console.log("listening to port")
})