const axios = require("axios");
const cheerio = require("cheerio");

async function obtenerNoticias() {
  try {
    const { data } = await axios.get("https://www.infobae.com/");

    const $ = cheerio.load(data);
    let noticias = [];

    $("a").each((i, el) => {
      const titulo = $(el).text().trim().toLowerCase();

      if (
        titulo.includes("ruta") ||
        titulo.includes("accidente") ||
        titulo.includes("choque") ||
        titulo.includes("santiago del estero") ||
         titulo.includes("santa fe") ||
 titulo.includes("rosario") ||
 titulo.includes("ruta 34") ||
        titulo.includes("la banda") ||
        titulo.includes("policial")
      ) {
        noticias.push({
          titulo: $(el).text().trim(),
          fuente: "Infobae"
        });
      }
    });

    return noticias.slice(0, 15);

  } catch (error) {
    console.log("Error:", error);
    return [];
  }
}

module.exports = { obtenerNoticias };
