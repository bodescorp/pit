const express = require("express");
const app = express();
const routes = require("./routes/routes");
const port= 3333;

// middlewares
app.use(express.json());

// routers
app.use(routes);

app.listen(port,()=> (console.log("Rodando api Pit")));