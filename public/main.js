const heartImg = document.getElementById('heart');
const trackerDiv = document.querySelector('.tracker');

function showLoading() {
  let loader = document.createElement('p');
  loader.id = 'loading-text';
  // loader.textContent = 'Caricamento in corso... ⏳';
  // trackerDiv.appendChild(loader);
}

function hideLoading() {
  const loader = document.getElementById('loading-text');
  if (loader) loader.remove();
}

let lastState = null; 

async function fetchHeartState() {
  showLoading();
  try {
    const res = await fetch('/api/getProgressState');
    const data = await res.json();
    
    if (data.state !== undefined && data.state !== lastState) {
      heartImg.src = `assets/heart-${data.state}.png`;
      lastState = data.state;
    }
  } catch (error) {
    console.error('Errore nel fetch dello stato:', error);
  } finally {
    hideLoading();
  }
}

// Avvia all'avvio e aggiorna ogni 3 secondi
window.addEventListener('load', () => {
  fetchHeartState();
  setInterval(fetchHeartState, 3000); 
});
