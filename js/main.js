// ============================================================
// LT HORMIGONES
// main.js
// Interacciones y carga dinámica
// ============================================================

document.addEventListener("DOMContentLoaded", () => {


    // ========================================================
    // AÑO DEL FOOTER
    // ========================================================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ========================================================
    // MENÚ MÓVIL
    // ========================================================

    const navToggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");

    if (navToggle && nav) {

        navToggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("is-open");

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            navToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Cerrar menú"
                    : "Abrir menú"
            );

        });


        // Cerrar al seleccionar una sección

        const navLinks =
            nav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                if (window.innerWidth <= 820) {

                    nav.classList.remove("is-open");

                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    navToggle.setAttribute(
                        "aria-label",
                        "Abrir menú"
                    );

                }

            });

        });


        // Cerrar automáticamente al volver a escritorio

        window.addEventListener("resize", () => {

            if (window.innerWidth > 820) {

                nav.classList.remove("is-open");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

            }

        });

    }


    // ========================================================
    // MODAL
    // ========================================================

    const modal =
        document.getElementById("modal");

    const modalContent =
        document.getElementById("modal-content");

    const modalClose =
        document.getElementById("modal-close");


    function openModal(content) {

        if (!modal || !modalContent) {
            return;
        }

        modalContent.innerHTML = content;

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal() {

        if (!modal || !modalContent) {
            return;
        }


        // Detener todos los videos

        const videos =
            modalContent.querySelectorAll("video");

        videos.forEach((video) => {

            try {

                video.pause();

                video.currentTime = 0;

            } catch (error) {

                console.warn(
                    "No se pudo detener el video.",
                    error
                );

            }

        });


        modalContent.innerHTML = "";

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {
                    closeModal();
                }

            }
        );

    }


    // Cerrar con ESC

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                modal &&
                modal.getAttribute("aria-hidden") === "false"
            ) {
                closeModal();
            }

        }
    );


    // ========================================================
    // GALERÍA DE MAQUINARIAS
    // ========================================================

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


    const machineCards =
        document.querySelectorAll(".machine");


    machineCards.forEach((card) => {


        function showMachineGallery() {

            const type =
                card.dataset.gallery;


            if (!type) {
                return;
            }


            const images =
                machineGallery[type];


            if (!images) {
                console.warn(
                    `No existe una galería para: ${type}`
                );

                return;
            }


            let galleryHTML = `
                <div class="machine-gallery">
            `;


            images.forEach((image, index) => {

                galleryHTML += `
                    <div class="machine-gallery-item">

                        <img
                            src="${image}"
                            alt="Maquinaria ${type} - imagen ${index + 1}"
                            loading="lazy"
                        >

                    </div>
                `;

            });


            galleryHTML += `
                </div>
            `;


            openModal(galleryHTML);

        }


        card.addEventListener(
            "click",
            showMachineGallery
        );


        // Accesibilidad con teclado

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    showMachineGallery();

                }

            }
        );

    });


    // ========================================================
    // VIDEOS DE OBRAS
    // ========================================================

    const obrasVideos = [

        {
            thumb:
                "assets/social/recuadro1.png",

            video:
                "assets/videos/obra2.mp4",

            title:
                "Laboratorio"
        },

        {
            thumb:
                "assets/social/recuadro2.png",

            video:
                "assets/videos/topadora1.mp4",

            title:
                "Motobomba"
        },

        {
            thumb:
                "assets/social/recuadro3.png",

            video:
                "assets/videos/topadora2.mp4",

            title:
                "Obra"
        },

        {
            thumb:
                "assets/social/recuadro4.png",

            video:
                "assets/videos/obra14.mp4",

            title:
                "Obra"
        },

        {
            thumb:
                "assets/social/recuadro5.png",

            video:
                "assets/videos/videomixer4.mp4",

            title:
                "Obra"
        },

        {
            thumb:
                "assets/social/recuadro6.png",

            video:
                "assets/videos/laboratorio.mp4",

            title:
                "Topadora"
        }

    ];


    const worksGallery =
        document.getElementById(
            "works-gallery"
        );


    if (worksGallery) {


        obrasVideos.forEach((item) => {

            const card =
                document.createElement("div");


            card.className =
                "gallery-item";


            card.setAttribute(
                "tabindex",
                "0"
            );


            card.setAttribute(
                "role",
                "button"
            );


            card.setAttribute(
                "aria-label",
                `Reproducir video: ${item.title}`
            );


            card.innerHTML = `

                <div class="video-thumb">

                    <img
                        src="${item.thumb}"
                        alt="${item.title}"
                        loading="lazy"
                    >

                    <div
                        class="play-icon"
                        aria-hidden="true"
                    >
                        ▶
                    </div>

                </div>

            `;


            function playVideo() {

                openModal(`

                    <div class="video-modal">

                        <video
                            controls
                            autoplay
                            playsinline
                            preload="metadata"
                        >

                            <source
                                src="${item.video}"
                                type="video/mp4"
                            >

                            Tu navegador no puede reproducir este video.

                        </video>

                    </div>

                `);

            }


            card.addEventListener(
                "click",
                playVideo
            );


            card.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        playVideo();

                    }

                }
            );


            worksGallery.appendChild(card);

        });

    }


    // ========================================================
    // MULTIMEDIA
    // ========================================================

    const mediaContainer =
        document.getElementById(
            "media-grid"
        );


    if (mediaContainer) {


        for (
            let i = 1;
            i <= 6;
            i++
        ) {

            const thumb =
                `assets/media/media${i}.jpg`;

            const video =
                `assets/media/media${i}.mp4`;


            const image =
                new Image();


            image.src =
                thumb;


            image.alt =
                `Contenido multimedia ${i}`;


            image.loading =
                "lazy";


            image.onload = () => {


                const mediaItem =
                    document.createElement("div");


                mediaItem.className =
                    "media-item";


                mediaItem.dataset.type =
                    "video";


                mediaItem.dataset.src =
                    video;


                mediaItem.appendChild(
                    image
                );


                const play =
                    document.createElement("span");


                play.className =
                    "play";


                play.textContent =
                    "▶";


                play.setAttribute(
                    "aria-hidden",
                    "true"
                );


                mediaItem.appendChild(
                    play
                );


                mediaItem.addEventListener(
                    "click",
                    async () => {

                        try {

                            const response =
                                await fetch(
                                    video,
                                    {
                                        method: "HEAD"
                                    }
                                );


                            if (response.ok) {

                                openModal(`

                                    <div class="video-modal">

                                        <video
                                            controls
                                            autoplay
                                            playsinline
                                            preload="metadata"
                                        >

                                            <source
                                                src="${video}"
                                                type="video/mp4"
                                            >

                                            Tu navegador no puede reproducir este video.

                                        </video>

                                    </div>

                                `);

                            } else {

                                openModal(`

                                    <img
                                        src="${thumb}"
                                        alt="Contenido multimedia ${i}"
                                    >

                                `);

                            }

                        } catch (error) {

                            console.warn(
                                `No se pudo comprobar ${video}`,
                                error
                            );


                            openModal(`

                                <img
                                    src="${thumb}"
                                    alt="Contenido multimedia ${i}"
                                >

                            `);

                        }

                    }
                );


                mediaContainer.appendChild(
                    mediaItem
                );

            };


            image.onerror = () => {

                console.warn(
                    `No se encontró: ${thumb}`
                );

            };

        }

    }


    // ========================================================
    // REDES SOCIALES
    // ========================================================

    const facebookUrl =
        "https://www.facebook.com/share/167cMEvde2r/?mibextid=wwXIfr";


    const instagramUrl =
        "https://www.instagram.com/lthormigones?igsi=MXc1dDQ0OW1tM2RuYg==";


    const facebookLink =
        document.getElementById(
            "facebook-link"
        );


    const instagramLink =
        document.getElementById(
            "instagram-link"
        );


    if (facebookLink) {

        facebookLink.href =
            facebookUrl;

        facebookLink.target =
            "_blank";

        facebookLink.rel =
            "noopener noreferrer";

    }


    if (instagramLink) {

        instagramLink.href =
            instagramUrl;

        instagramLink.target =
            "_blank";

        instagramLink.rel =
            "noopener noreferrer";

    }


    // ========================================================
    // FORMULARIO
    // ========================================================

    const form =
        document.getElementById(
            "contact-form"
        );


    if (form) {

        form.addEventListener(
            "submit",
            () => {

                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Enviando...";

                }

            }
        );

    }


    // ========================================================
    // ANCHOR / SCROLL SUAVE
    // ========================================================

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    // ========================================================
    // HEADER AL HACER SCROLL
    // ========================================================

    const header =
        document.querySelector(
            ".site-header"
        );


    if (header) {


        const updateHeader =
            () => {

                if (
                    window.scrollY > 100
                ) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();

    }

});
