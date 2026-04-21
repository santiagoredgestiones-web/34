const { obtenerClima } = require("./clima");
const express = require("express");
const cors = require("cors");
const { obtenerNoticias } = require("./scraper");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// ruta principal
app.get("/", (req, res) => {
  res.send("Backend Ruta 34 funcionando 🚀");
});

// noticias reales
app.get("/noticias", async (req, res) => {
  try {
    const noticias = await obtenerNoticias();
    res.json(noticias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo noticias" });
  }
});

// accidentes (filtrado)
app.get("/accidentes", async (req, res) => {
  try {
    const noticias = await obtenerNoticias();

    const accidentes = noticias.filter(n =>
      n.titulo.toLowerCase().includes("accidente") ||
      n.titulo.toLowerCase().includes("choque") ||
      n.titulo.toLowerCase().includes("muerte")
    );

    res.json(accidentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo accidentes" });
  }
});
app.get("/clima", async (req, res) => {
  try {
    const clima = await obtenerClima();
    res.json(clima);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo clima" });
  }
});
app.get("/alertas", async (req, res) => {
  try {
    const clima = await obtenerClima();

    const alertas = clima.filter(c => c.alerta);

    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo alertas" });
  }
});

// puerto dinámico (IMPORTANTE para Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
