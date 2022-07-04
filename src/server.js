const express = require("express");
const cors = require('cors');
const routes = require("./routes/routes");
// const { validError } = require("./middlewares/validError");

const port= 3333;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());


// routers
app.use(routes);

// app.use(validErroror)


app.listen(port,()=> (console.log("Rodando api Pit")));