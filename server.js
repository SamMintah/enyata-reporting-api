const express = require("express");
const incidentRoutes = require("./src/routes/routes");


const app = express();
const PORT = 3000;
app.use(express.json());

//routes 
app.get('/', (req, res) => {
  res.send("Hello welcome to enyata insurance incident reporting api")
})
app.use('/insurance/api/incidents',incidentRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
 