const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ROUTE DOSYALARI
const movieRoutes = require("./routes/movieRoutes");

// MIDDLEWARE'LER
app.use(cors());
app.use(express.json());

// ROUTELAR
app.use("/api/movies", movieRoutes);

app.get("/", (_req, res) => {
  res.send("Backend çalışıyor!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
