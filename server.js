const express = require("express");
const joyasRoutes = require("./routes/joyasRoutes");
const logger = require("./middlewares/logger");

require("dotenv").config();


const app = express();
const port = 3000;

app.use(logger);

app.use(express.json());
app.use(joyasRoutes);



app.listen(port, () => {
  console.log(`Server levantado en el puerto ${port}`);
});
