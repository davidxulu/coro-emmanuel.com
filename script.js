function App() {}

window.onload = function(event) {
    var app = new App();
    window.app = app;
    renderLiturgicalTabs();
}

App.prototype.processingButton = function(event) {

    const btn = event.currentTarget;
    const carruselList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const carrusel = track.querySelectorAll('.carrusel');

    const carruselWidth = carrusel[0].offsetWidth;

    const trackWidth = track.offsetWidth;
    const listWidth = carruselList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);
    btn.dataset.button == "button-prev" ? prevAction(leftPosition, carruselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track);

}

App.prototype.openLightbox = function(event) {
    const img = event.currentTarget;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

App.prototype.closeLightbox = function(event) {
    document.getElementById('lightbox').classList.remove('is-open');
    document.body.style.overflow = '';
}


let prevAction = (leftPosition, carruselWidth, track) => {
    if (leftPosition > 0) {

        track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;
    }

}

let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) => {

    if (leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
    }

}

// Tiempos litúrgicos: colores oficiales + IDs de YouTube
const liturgicalTimes = [
  { id: 'adviento',  label: 'Adviento',         color: '#6B3FA0', youtubeId: 'PON_ID_ADVIENTO',  poster: 'img/videos/adviento.webp' },
  { id: 'navidad',   label: 'Navidad',          color: '#D4AF37', youtubeId: 'IYwSWN_G4i4',   poster: 'img/videos/navidad.webp' },
  { id: 'cuaresma',  label: 'Cuaresma',         color: '#5C3B70', youtubeId: 'PON_ID_CUARESMA',  poster: 'img/videos/cuaresma.webp' },
  { id: 'pascua',    label: 'Pascua',           color: '#F2C14E', youtubeId: 'PON_ID_PASCUA',    poster: 'img/videos/pascua.webp' },
  { id: 'ordinario', label: 'Tiempo Ordinario', color: '#4C8C4A', youtubeId: 'PON_ID_ORDINARIO', poster: 'img/videos/ordinario.webp' },
];

App.prototype.selectLiturgicalTime = function(event) {
    const timeId = event.currentTarget.dataset.timeId;
    setLiturgicalTime(timeId);
}

App.prototype.loadVideo = function(event) {
    const frame = document.getElementById('video-frame');
    const videoId = frame.dataset.youtubeId;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = 'Video del coro Emmanuel';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    frame.innerHTML = '';
    frame.appendChild(iframe);
}

function setLiturgicalTime(timeId) {
    const time = liturgicalTimes.find(t => t.id === timeId);
    const frame = document.getElementById('video-frame');

    frame.style.setProperty('--tab-color', time.color);
    frame.dataset.youtubeId = time.youtubeId;

    // Restaura la miniatura + botón de play (por si venías de otro video reproduciéndose)
    frame.innerHTML = `
      <img src="${time.poster}" alt="Miniatura del coro Emmanuel — ${time.label}" class="video-frame__poster">
      <button class="video-frame__play" aria-label="Reproducir video" onclick="app.loadVideo(event)">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="currentColor"></path>
        </svg>
      </button>`;

    document.querySelectorAll('.liturgical-tab').forEach(tab => {
        const isActive = tab.dataset.timeId === timeId;
        tab.classList.toggle('is-active', isActive);
        tab.style.setProperty('--tab-color', time.color);
    });
}

function renderLiturgicalTabs() {
    const container = document.getElementById('liturgical-tabs');
    container.innerHTML = liturgicalTimes.map(time => `
      <button class="liturgical-tab" data-time-id="${time.id}" style="--tab-color:${time.color}" onclick="app.selectLiturgicalTime(event)">
        ${time.label}
      </button>`).join('');

    setLiturgicalTime(liturgicalTimes[0].id);
}


/*function App(){}
    window.onload=function(event){
        var app = new App();
        window.app = app;
    }

    App.prototype.processingButton = function(event){
        const btn = event.currentTarget;
        const carruselList = event.currentTarget.parentNode;
        const track = event.currentTarget.parentNode.querySelector('#track');
        const carrusel = track.querySelectorAll('.carrusel');

       
        const carruselWidth=carrusel[0].offsetWidth;
        const trackWidth = track.offsetWidth;
        const listWidth=carruselList.offsetWidth;

        track.style.left =="" ? leftPosition = track.style.left=0: leftPosition= parseFloat(track.style.left.slice(0,-2) *-1);
        btn.dataset.button == "button-prev" ? prevAction(leftPosition.carruselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track);
    }

    let prevAction = (leftPosition, carruselWidth, track) => {
        if(leftPosition > 0){
            track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;
        }
    }

    let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) =>{
        if(leftPosition < (trackWidth - listWidth)){
            track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
        }
    }*/
