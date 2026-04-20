const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend Ruta 34 funcionando 🚀");
});

const { obtenerNoticias } = require("./scraper");

app.get("/noticias", async (req, res) => {
  const noticias = await obtenerNoticias();
  res.json(noticias);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo"));
