const axios = require("axios");

// Coordenadas aproximadas de ciudades clave
const CIUDADES = {
  "La Banda": { lat: -27.733, lon: -64.242 },
  "Fernandez": { lat: -27.920, lon: -63.893 },
  "Colonia Dora": { lat: -28.600, lon: -62.950 },
  "Selva": { lat: -29.767, lon: -62.050 }
};

function interpretarClima(codigo) {
  if ([61, 63, 65, 80, 81, 82].includes(codigo)) return "lluvia";
  if ([45, 48].includes(codigo)) return "niebla";
  return "normal";
}

async function obtenerClima() {
  let resultados = [];

  for (const ciudad in CIUDADES) {
    const { lat, lon } = CIUDADES[ciudad];

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      const { data } = await axios.get(url);

      const codigo = data.current_weather.weathercode;
      const estado = interpretarClima(codigo);

      resultados.push({
        ciudad,
        temperatura: data.current_weather.temperature,
        viento: data.current_weather.windspeed,
        estado,
        alerta: estado !== "normal"
      });

    } catch (error) {
      console.log("Error clima:", ciudad);
    }
  }

  return resultados;
}

module.exports = { obtenerClima };
