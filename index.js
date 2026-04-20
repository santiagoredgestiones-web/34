const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend Ruta 34 funcionando 🚀");
});

app.get("/noticias", (req, res) => {
  res.json([
    { titulo: "Prueba noticia Ruta 34" }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo"));
