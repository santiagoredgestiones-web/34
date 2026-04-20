const express = require("express");
const cors = require("cors");
const { obtenerNoticias } = require("./scraper");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo"));
