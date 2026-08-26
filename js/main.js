// js/main.js - Interacciones y carga dinámica de assets
document.addEventListener('DOMContentLoaded', function(){
  // Año en footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle menú móvil
    if(getComputedStyle(nav).display === 'flex'){
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.padding = '12px';
    }
  });
  // Cerrar menú al hacer click en enlace
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    if(window.innerWidth <= 820) nav.style.display = 'none';
  }));

  // Modal para galería y multimedia
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  function openModal(html){
    modalContent.innerHTML = html;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  // Carga dinámica de galería de obras (assets/works/work1.jpg ... work8.jpg)
  const worksContainer = document.getElementById('works-gallery');
  if(worksContainer){
    for(let i=1;i<=8;i++){
      const src = `assets/works/work${i}.jpg`;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const fig = document.createElement('figure');
        fig.className = 'gallery-item';
        fig.dataset.type = 'image';
        fig.dataset.src = src;
        img.alt = `Obra ${i}`;
        fig.appendChild(img);
        fig.addEventListener('click', ()=> openModal(`<img src="${src}" alt="Obra">`));
        worksContainer.appendChild(fig);
      };
    }
  }

  // Carga dinámica multimedia (assets/media/media1.jpg y assets/media/media1.mp4)
  const mediaContainer = document.getElementById('media-grid');
  if(mediaContainer){
    for(let i=1;i<=6;i++){
      const thumb = `assets/media/media${i}.jpg`;
      const video = `assets/media/media${i}.mp4`;
      // Primero intentamos cargar thumb
      const img = new Image();
      img.src = thumb;
      img.onload = () => {
        const div = document.createElement('div');
        div.className = 'media-item';
        div.dataset.type = 'video';
        // Si existe video local, lo abrimos en modal con <video>, si no, solo mostramos imagen
        div.dataset.src = video;
        img.alt = `Video ${i}`;
        const play = document.createElement('span'); play.className='play'; play.textContent='▶';
        div.appendChild(img);
        div.appendChild(play);
        div.addEventListener('click', ()=>{
          // Verificar si existe el video (intentamos cargarlo)
          fetch(video, {method:'HEAD'}).then(res=>{
            if(res.ok){
              openModal(`<video controls autoplay style=\"width:100%;height:100%\"><source src=\"${video}\" type=\"video/mp4\"></video>`);
            } else {
              // Si no existe video local, buscar posible youtube embed guardado en dataset (fallback)
              // Por ahora abrimos la imagen en modal
              openModal(`<img src=\"${thumb}\" alt=\"Video\">`);
            }
          }).catch(()=>{
            openModal(`<img src=\"${thumb}\" alt=\"Media\">`);
          });
        });
        mediaContainer.appendChild(div);
      };
    }
  }

  // Social links (rellenar href en HTML o usando estas variables)
  const facebookUrl = "https://www.facebook.com/share/167cMEvde2r/?mibextid=wwXIfr";
  const instagramUrl = 'https://www.instagram.com/lthormigones?igsi=MXc1dDQ0OW1tM2RuYg==';
  const fbLink = document.getElementById('facebook-link');
  const igLink = document.getElementById('instagram-link');
  if(fbLink) fbLink.href = facebookUrl;
  if(igLink) igLink.href = instagramUrl;

  // Feedback al enviar el formulario (compatible con Formspree)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      // dejamos que el envío ocurra normalmente; añadimos feedback UX
      setTimeout(()=>{
        alert('Gracias. Tu mensaje fue enviado. Nos contactaremos a la brevedad.');
        form.reset();
      },400);
    });
  }

  // Mejora de accesibilidad: focus visible para salto por anchors
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(l=> l.addEventListener('click', function(){
    const id = this.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if(el) el.setAttribute('tabindex','-1');
  }));

  // Small enhancement: if hero video absent, show poster (browser handles it) and ensure contrast
});
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 100){
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});
/* ============================
   MENU HAMBURGUESA
============================ */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("main-nav");

if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

}

document.querySelectorAll(".main-nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 820) {

            navMenu.classList.remove("show");

        }

    });

});
/* ============================
   GALERIA MAQUINARIAS
============================ */

const machineGallery = {

    mezcladora: [
        "assets/social/fotomixer1.png",
        "assets/social/fotomixer2.png",
        "assets/social/fotomixer4.png",
        "assets/social/fotomixer6.png"
    ],

    planta: [
        "assets/social/fotoniveladora1.png",
        "assets/social/fotopison1.png",
        "assets/social/fototractor2.png",
        "assets/social/fototopa4.png"
    ],

    camionbomba: [
        "assets/social/fotobomba2.png",
        "assets/social/fotobomba10.png",
        "assets/social/fotobomba23.png",
        "assets/social/fotobomba33.png"
    ]

};

document.querySelectorAll(".machine").forEach(card => {

    card.addEventListener("click", () => {

        const type = card.dataset.gallery;

        if(!machineGallery[type]) return;

        let galleryHtml = `
            <div style="
                display:grid;
                grid-template-columns:repeat(2,1fr);
                gap:15px;
                padding:20px;
            ">
        `;

        machineGallery[type].forEach(img => {

            galleryHtml += `
                <img
                    src="${img}"
                    style="
                        width:100%;
                 ml);

    });

});
