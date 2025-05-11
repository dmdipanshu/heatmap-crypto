// app.js
const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

async function fetchCryptoData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayHeatmap(data);
}

function displayHeatmap(coins) {
  const container = document.getElementById("heatmap-container");
  container.innerHTML = '';

  coins.forEach(coin => {
    const box = document.createElement("div");
    box.className = `crypto-box ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}`;
    box.innerHTML = `
      <strong>${coin.symbol.toUpperCase()}</strong><br/>
      $${coin.current_price.toFixed(2)}<br/>
      ${coin.price_change_percentage_24h.toFixed(2)}%
    `;
    container.appendChild(box);
  });
}

fetchCryptoData();
setInterval(fetchCryptoData, 60000); // Refresh every 60 seconds
