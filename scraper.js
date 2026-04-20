const axios = require("axios");
const cheerio = require("cheerio");

async function obtenerNoticias() {
  try {
    const { data } = await axios.get("https://www.infobae.com/");

    const $ = cheerio.load(data);
    let noticias = [];

    $("a").each((i, el) => {
      const titulo = $(el).text();

      if (titulo.toLowerCase().includes("ruta 34")) {
        noticias.push({
          titulo,
          fuente: "Infobae"
        });
      }
    });

    return noticias.slice(0, 10);
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = { obtenerNoticias };
