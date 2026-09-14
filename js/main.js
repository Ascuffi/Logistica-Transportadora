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
// FORMULARIO EMAILJS
// ========================================================

const form =
    document.getElementById(
        "contact-form"
    );

if (form) {

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );

            submitButton.disabled = true;

            submitButton.textContent =
                "Enviando...";

            try {

                await emailjs.send(

                    "service_1",

                    "template_gogx17t",

                    {

                        name:
                            document.getElementById("name").value,

                        phone:
                            document.getElementById("phone").value,

                        email:
                            document.getElementById("email").value,

                        message:
                            document.getElementById("message").value

                    }

                );

                alert(
                    "✅ Consulta enviada correctamente.\n\nGracias por contactar a LT Hormigones."
                );

                form.reset();

            } catch (error) {

                console.error(error);

                alert(
                    "❌ Error al enviar la consulta."
                );

            }

            submitButton.disabled = false;

            submitButton.textContent =
                "Enviar";

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
// ============================================================
// ASISTENTE VIRTUAL LT HORMIGONES
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // CONFIGURACIÓN
    // ========================================================

    const LT_CONFIG = {

        ventas: "5492262615158",

        administracion: "5492262500004",

        gerente: "5492262500026"

    };


    // ========================================================
    // ELEMENTOS
    // ========================================================

    const chatToggle =
        document.getElementById("lt-chat-toggle");

    const chatWindow =
        document.getElementById("lt-chat-window");

    const chatClose =
        document.getElementById("lt-chat-close");

    const chatBody =
        document.getElementById("lt-chat-body");

    const chatHome =
        document.getElementById("lt-chat-home");

    const chatBack =
        document.getElementById("lt-chat-back");


    if (
        !chatToggle ||
        !chatWindow ||
        !chatBody
    ) {
        return;
    }


    // ========================================================
    // ESTADO
    // ========================================================

    let history = [];

    let order = {};


    // ========================================================
    // UTILIDADES
    // ========================================================

    function escapeHTML(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function scrollChat() {

        setTimeout(() => {

            chatBody.scrollTop =
                chatBody.scrollHeight;

        }, 30);

    }


    function setScreen(html, saveHistory = true) {

        if (
            saveHistory &&
            chatBody.innerHTML.trim()
        ) {

            history.push(
                chatBody.innerHTML
            );

        }

        chatBody.innerHTML = html;

        scrollChat();

    }


    function addMessage(
        text,
        type = "bot"
    ) {

        const message =
            document.createElement("div");

        message.className =
            `lt-chat-message ${type}`;

        message.innerHTML =
            text;

        chatBody.appendChild(message);

        scrollChat();

    }


    function openWhatsApp(
        number,
        message
    ) {

        const url =
            `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    // ========================================================
    // ABRIR / CERRAR
    // ========================================================

    function openChat() {

        chatWindow.classList.add(
            "is-open"
        );

        chatWindow.setAttribute(
            "aria-hidden",
            "false"
        );

        chatToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeChat() {

        chatWindow.classList.remove(
            "is-open"
        );

        chatWindow.setAttribute(
            "aria-hidden",
            "true"
        );

        chatToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    chatToggle.addEventListener(
        "click",
        () => {

            if (
                chatWindow.classList.contains(
                    "is-open"
                )
            ) {

                closeChat();

            } else {

                openChat();

            }

        }
    );


    if (chatClose) {

        chatClose.addEventListener(
            "click",
            closeChat
        );

    }


    // ========================================================
    // MENÚ PRINCIPAL
    // ========================================================

    function showHome() {

        history = [];

        order = {};

        setScreen(`

            <div class="lt-chat-message bot">

                👋 ¡Hola! Soy el
                <strong>Asistente Virtual de LT Hormigones</strong>.

                <br><br>

                Puedo ayudarte a calcular materiales,
                solicitar presupuestos y comunicarte
                con nuestro equipo.

                <br><br>

                <strong>¿Qué necesitás?</strong>

            </div>


            <div class="lt-chat-options">

                <button
                    class="lt-chat-option"
                    data-action="concrete"
                >
                    🧱 Hormigón elaborado
                </button>

                <button
                    class="lt-chat-option"
                    data-action="aggregates"
                >
                    🪨 Arena y piedra
                </button>

                <button
                    class="lt-chat-option"
                    data-action="machinery"
                >
                    🚜 Maquinaria y servicios
                </button>

                <button
                    class="lt-chat-option"
                    data-action="calculator"
                >
                    🧮 Calcular m³
                </button>

                <button
                    class="lt-chat-option"
                    data-action="project"
                >
                    🏗️ Tengo una obra
                </button>

                <button
                    class="lt-chat-option"
                    data-action="sales"
                >
                    👨‍💼 Hablar con Ventas
                </button>

                <button
                    class="lt-chat-option full"
                    data-action="admin"
                >
                    📑 Administración
                </button>

            </div>

        `, false);

    }


    // ========================================================
    // HORMIGONES
    // ========================================================

    const concretes = [

        {
            type: "H4",
            mpa: "4 MPa",
            description:
                "Hormigón de muy baja resistencia para aplicaciones no estructurales específicas."
        },

        {
            type: "H8",
            mpa: "8 MPa",
            description:
                "Hormigón de baja resistencia para trabajos auxiliares y hormigón de limpieza."
        },

        {
            type: "H10",
            mpa: "10 MPa",
            description:
                "Hormigón de baja resistencia para aplicaciones no estructurales según proyecto."
        },

        {
            type: "H13",
            mpa: "13 MPa",
            description:
                "Hormigón de resistencia intermedia para distintas aplicaciones constructivas."
        },

        {
            type: "H15",
            mpa: "15 MPa",
            description:
                "Hormigón de resistencia intermedia para usos definidos según requerimientos de obra."
        },

        {
            type: "H17",
            mpa: "17 MPa",
            description:
                "Hormigón de mayor prestación según las exigencias técnicas del proyecto."
        },

        {
            type: "H21",
            mpa: "21 MPa",
            description:
                "Hormigón utilizado en distintas aplicaciones estructurales según proyecto."
        },

        {
            type: "H25",
            mpa: "25 MPa",
            description:
                "Hormigón de resistencia superior para proyectos con mayores exigencias."
        },

        {
            type: "H30",
            mpa: "30 MPa",
            description:
                "Hormigón de alta resistencia para estructuras y obras de mayores prestaciones."
        },

        {
            type: "H35",
            mpa: "35 MPa",
            description:
                "Hormigón de alta resistencia para proyectos con exigencias estructurales específicas."
        }

    ];


    function showConcrete() {

        const buttons =
            concretes.map(
                item => `

                    <button
                        class="lt-concrete-btn"
                        data-concrete="${item.type}"
                    >

                        <strong>
                            ${item.type}
                        </strong>

                        <span>
                            ${item.mpa}
                        </span>

                    </button>

                `
            ).join("");


        setScreen(`

            <div class="lt-chat-message bot">

                🧱 <strong>Hormigón elaborado</strong>

                <br><br>

                Seleccioná la resistencia
                especificada para tu obra.

            </div>


            <div class="lt-concrete-grid">

                ${buttons}

            </div>


            <div class="lt-chat-options">

                <button
                    class="lt-chat-option full"
                    data-concrete="unknown"
                >
                    ❓ No sé cuál necesito
                </button>

            </div>


            <div class="lt-chat-warning">

                ⚠️ La información es orientativa.
                Para elementos estructurales,
                utilizá siempre el hormigón indicado
                en el proyecto, plano o por el
                profesional responsable.

            </div>

        `);

    }


    function showConcreteInfo(type) {

        if (type === "unknown") {

            order.concrete =
                "A definir / Solicita asesoramiento";

            setScreen(`

                <div class="lt-chat-message bot">

                    👍 No hay problema.

                    <br><br>

                    Nuestro equipo puede ayudarte
                    comercialmente a identificar la
                    opción correspondiente según la
                    especificación de tu obra.

                </div>

                <div class="lt-chat-options">

                    <button
                        class="lt-chat-option"
                        data-action="calculator"
                    >
                        🧮 Calcular cantidad
                    </button>

                    <button
                        class="lt-chat-option"
                        data-action="concreteQuote"
                    >
                        💰 Solicitar presupuesto
                    </button>

                </div>

            `);

            return;
        }


        const concrete =
            concretes.find(
                item =>
                    item.type === type
            );


        if (!concrete) {
            return;
        }


        order.concrete =
            concrete.type;


        setScreen(`

            <div class="lt-chat-message bot">

                🧱 <strong>${concrete.type}</strong>

                <br><br>

                Resistencia nominal:
                <strong>${concrete.mpa}</strong>

                <br><br>

                ${concrete.description}

            </div>


            <div class="lt-chat-warning">

                La selección definitiva del
                hormigón debe respetar la
                especificación técnica de la obra.

            </div>


            <div class="lt-chat-options">

                <button
                    class="lt-chat-option"
                    data-action="calculator"
                >
                    🧮 Calcular cantidad
                </button>

                <button
                    class="lt-chat-option"
                    data-action="concreteQuote"
                >
                    💰 Pedir presupuesto
                </button>

            </div>

        `);

    }


    // ========================================================
    // CALCULADORA
    // ========================================================

    function showCalculator() {

        setScreen(`

            <div class="lt-chat-message bot">

                🧮 <strong>Calculadora de hormigón</strong>

                <br><br>

                ¿Qué elemento querés calcular?

            </div>


            <div class="lt-chat-options">

                <button
                    class="lt-chat-option"
                    data-calc="slab"
                >
                    🏗️ Piso / Platea
                </button>

                <button
                    class="lt-chat-option"
                    data-calc="slab"
                >
                    🏢 Losa
                </button>

                <button
                    class="lt-chat-option"
                    data-calc="beam"
                >
                    ▬ Viga
                </button>

                <button
                    class="lt-chat-option"
                    data-calc="column"
                >
                    ▮ Columna
                </button>

                <button
                    class="lt-chat-option full"
                    data-calc="custom"
                >
                    📐 Otro elemento rectangular
                </button>

            </div>

        `);

    }


    function showCalculatorForm(type) {

        const names = {

            slab:
                "Piso / Platea / Losa",

            beam:
                "Viga",

            column:
                "Columna",

            custom:
                "Elemento rectangular"

        };


        order.workType =
            names[type];


        setScreen(`

            <div class="lt-chat-message bot">

                📐 <strong>${names[type]}</strong>

                <br><br>

                Ingresá las medidas.

            </div>


            <form
                id="lt-volume-form"
                class="lt-chat-form"
            >

                <div class="lt-chat-field">

                    <label>
                        Largo / Altura (metros)
                    </label>

                    <input
                        id="lt-length"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="Ej: 10"
                        required
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        Ancho (metros)
                    </label>

                    <input
                        id="lt-width"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="Ej: 5"
                        required
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        Espesor / Profundidad (cm)
                    </label>

                    <input
                        id="lt-depth"
                        type="number"
                        min="0.1"
                        step="0.1"
                        placeholder="Ej: 12"
                        required
                    >

                </div>


                <button
                    class="lt-chat-submit"
                    type="submit"
                >
                    🧮 Calcular volumen
                </button>

            </form>


            <div class="lt-chat-warning">

                Ingresá largo y ancho en metros.
                El espesor se ingresa en centímetros.

            </div>

        `);

    }


    function calculateVolume(form) {

        const length =
            Number(
                document.getElementById(
                    "lt-length"
                ).value
            );

        const width =
            Number(
                document.getElementById(
                    "lt-width"
                ).value
            );

        const depthCm =
            Number(
                document.getElementById(
                    "lt-depth"
                ).value
            );


        if (
            length <= 0 ||
            width <= 0 ||
            depthCm <= 0
        ) {
            return;
        }


        const depthMeters =
            depthCm / 100;


        const volume =
            length *
            width *
            depthMeters;


        order.length =
            length;

        order.width =
            width;

        order.depthCm =
            depthCm;

        order.volume =
            volume.toFixed(2);


        setScreen(`

            <div class="lt-chat-message bot">

                ✅ Cálculo realizado.

            </div>


            <div class="lt-calculation-result">

                <small>
                    Volumen geométrico estimado
                </small>

                <strong>
                    ${order.volume} m³
                </strong>

                <small>
                    ${length} m ×
                    ${width} m ×
                    ${depthMeters.toFixed(3)} m
                </small>

            </div>


            <div class="lt-chat-warning">

                ⚠️ El resultado corresponde al
                volumen geométrico teórico.
                No contempla pérdidas, irregularidades,
                desperdicios ni condiciones particulares
                de la obra.

            </div>


            <div class="lt-chat-options">

                <button
                    class="lt-chat-option"
                    data-action="concrete"
                >
                    🧱 Elegir hormigón
                </button>

                <button
                    class="lt-chat-option"
                    data-action="concreteQuote"
                >
                    💰 Pedir presupuesto
                </button>

                <button
                    class="lt-chat-option full"
                    data-action="calculator"
                >
                    🔄 Calcular nuevamente
                </button>

            </div>

        `);

    }


    // ========================================================
    // ÁRIDOS
    // ========================================================

    function showAggregates() {

        setScreen(`

            <div class="lt-chat-message bot">

                🪨 <strong>Arena y piedra</strong>

                <br><br>

                ¿Qué material necesitás?

            </div>


            <div class="lt-chat-options">

                <button
                    class="lt-chat-option"
                    data-material="Arena de cantera"
                >
                    🏖️ Arena de cantera
                </button>

                <button
                    class="lt-chat-option"
                    data-material="Piedra 1/3"
                >
                    🪨 Piedra 1/3
                </button>

                <button
                    class="lt-chat-option"
                    data-material="Piedra 6/20"
                >
                    🪨 Piedra 6/20
                </button>

            </div>


            <div class="lt-chat-warning">

                💰 Los precios pueden variar
                según material, modalidad y
                cantidad solicitada.

            </div>

        `);

    }


    function selectMaterial(material) {

        order.product =
            material;


        if (
            material ===
            "Arena de cantera"
        ) {

            setScreen(`

                <div class="lt-chat-message bot">

                    🏖️ <strong>
                        Arena de cantera
                    </strong>

                    <br><br>

                    ¿Qué modalidad necesitás?

                </div>


                <div class="lt-chat-options">

                    <button
                        class="lt-chat-option"
                        data-material-mode="Por metro"
                    >
                        📦 Por metro
                    </button>

                    <button
                        class="lt-chat-option"
                        data-material-mode="Por batea"
                    >
                        🚛 Por batea
                    </button>

                </div>

            `);

        } else {

            order.materialMode =
                "Según cantidad";

            showMaterialQuantity();

        }

    }


    function showMaterialQuantity() {

        setScreen(`

            <div class="lt-chat-message bot">

                📦 Indicá la cantidad aproximada
                que necesitás.

            </div>


            <form
                id="lt-material-form"
                class="lt-chat-form"
            >

                <div class="lt-chat-field">

                    <label>
                        Cantidad aproximada
                    </label>

                    <input
                        id="lt-material-quantity"
                        type="text"
                        placeholder="Ej: 10 m³, 1 batea..."
                        required
                    >

                </div>


                <button
                    class="lt-chat-submit"
                    type="submit"
                >
                    Continuar
                </button>

            </form>

        `);

    }


    // ========================================================
    // MAQUINARIA
    // ========================================================

    function showMachinery() {

        setScreen(`

            <div class="lt-chat-message bot">

                🚜 <strong>
                    Maquinaria y Servicios para Obra
                </strong>

                <br><br>

                Seleccioná el servicio
                que necesitás.

            </div>


            <div class="lt-chat-options">

                <button
                    class="lt-chat-option"
                    data-machine="Logística y Transporte"
                >
                    🚛 Logística y Transporte
                </button>

                <button
                    class="lt-chat-option"
                    data-machine="Motobomba / Bombeo"
                >
                    🚧 Motobomba / Bombeo
                </button>

                <button
                    class="lt-chat-option"
                    data-machine="Retropala"
                >
                    🚜 Retropala
                </button>

                <button
                    class="lt-chat-option"
                    data-machine="Motoniveladora"
                >
                    🏗️ Motoniveladora
                </button>

                <button
                    class="lt-chat-option"
                    data-machine="Retroexcavadora"
                >
                    🚜 Retroexcavadora
                </button>

                <button
                    class="lt-chat-option"
                    data-machine="Champion"
                >
                    🚧 Champion
                </button>

            </div>

        `);

    }


    function selectMachine(machine) {

        order.product =
            "Servicio de maquinaria";

        order.machine =
            machine;


        setScreen(`

            <div class="lt-chat-message bot">

                🚜 Servicio seleccionado:

                <br><br>

                <strong>
                    ${escapeHTML(machine)}
                </strong>

                <br><br>

                Contanos brevemente
                qué trabajo necesitás realizar.

            </div>


            <form
                id="lt-machine-form"
                class="lt-chat-form"
            >

                <div class="lt-chat-field">

                    <label>
                        Trabajo a realizar
                    </label>

                    <textarea
                        id="lt-machine-work"
                        placeholder="Ej: limpieza y movimiento de suelo..."
                        required
                    ></textarea>

                </div>


                <button
                    class="lt-chat-submit"
                    type="submit"
                >
                    Continuar
                </button>

            </form>

        `);

    }


    // ========================================================
    // SOLICITUD GENERAL
    // ========================================================

    function showQuoteDetails() {

        setScreen(`

            <div class="lt-chat-message bot">

                📋 Para preparar tu solicitud
                necesitamos algunos datos.

            </div>


            <form
                id="lt-quote-form"
                class="lt-chat-form"
            >

                <div class="lt-chat-field">

                    <label>
                        Nombre
                    </label>

                    <input
                        id="lt-customer-name"
                        type="text"
                        placeholder="Tu nombre"
                        autocomplete="name"
                        required
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        Ubicación de la obra
                    </label>

                    <input
                        id="lt-location"
                        type="text"
                        placeholder="Ej: Quequén, Buenos Aires"
                        required
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        Fecha estimada
                    </label>

                    <input
                        id="lt-date"
                        type="date"
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        ¿Necesitás servicio de bombeo?
                    </label>

                    <select
                        id="lt-pump"
                    >

                        <option value="No especificado">
                            Seleccionar
                        </option>

                        <option value="Sí">
                            Sí
                        </option>

                        <option value="No">
                            No
                        </option>

                        <option value="Quiero consultar">
                            Quiero consultar
                        </option>

                    </select>

                </div>


                <button
                    class="lt-chat-submit"
                    type="submit"
                >
                    📋 Preparar solicitud
                </button>

            </form>

        `);

    }


    // ========================================================
    // PROYECTO COMPLETO
    // ========================================================

    function showProjectForm() {

        order =
            {
                product:
                    "Consulta integral de obra"
            };


        setScreen(`

            <div class="lt-chat-message bot">

                🏗️ <strong>
                    Contanos sobre tu obra
                </strong>

                <br><br>

                Prepararemos una consulta completa
                para nuestro equipo comercial.

            </div>


            <form
                id="lt-project-form"
                class="lt-chat-form"
            >

                <div class="lt-chat-field">

                    <label>
                        Nombre
                    </label>

                    <input
                        id="lt-project-name"
                        type="text"
                        required
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        Localidad / ubicación
                    </label>

                    <input
                        id="lt-project-location"
                        type="text"
                        required
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        Tipo de obra
                    </label>

                    <input
                        id="lt-project-type"
                        type="text"
                        placeholder="Ej: vivienda, galpón, platea..."
                        required
                    >

                </div>


                <div class="lt-chat-field">

                    <label>
                        Descripción
                    </label>

                    <textarea
                        id="lt-project-description"
                        placeholder="Contanos qué materiales, hormigón o maquinaria necesitás..."
                        required
                    ></textarea>

                </div>


                <div class="lt-chat-field">

                    <label>
                        Fecha estimada
                    </label>

                    <input
                        id="lt-project-date"
                        type="date"
                    >

                </div>


                <button
                    class="lt-chat-submit"
                    type="submit"
                >
                    Preparar consulta
                </button>

            </form>

        `);

    }


    // ========================================================
    // RESUMEN
    // ========================================================

    function showSummary() {

        let summary =
            "";


        if (order.product) {

            summary += `
                <strong>Producto / servicio:</strong>
                ${escapeHTML(order.product)}
                <br>
            `;

        }


        if (order.concrete) {

            summary += `
                <strong>Hormigón:</strong>
                ${escapeHTML(order.concrete)}
                <br>
            `;

        }


        if (order.workType) {

            summary += `
                <strong>Elemento:</strong>
                ${escapeHTML(order.workType)}
                <br>
            `;

        }


        if (order.volume) {

            summary += `
                <strong>Volumen estimado:</strong>
                ${escapeHTML(order.volume)} m³
                <br>
            `;

        }


        if (order.materialMode) {

            summary += `
                <strong>Modalidad:</strong>
                ${escapeHTML(order.materialMode)}
                <br>
            `;

        }


        if (order.quantity) {

            summary += `
                <strong>Cantidad:</strong>
                ${escapeHTML(order.quantity)}
                <br>
            `;

        }


        if (order.machine) {

            summary += `
                <strong>Maquinaria:</strong>
                ${escapeHTML(order.machine)}
                <br>
            `;

        }


        if (order.machineWork) {

            summary += `
                <strong>Trabajo:</strong>
                ${escapeHTML(order.machineWork)}
                <br>
            `;

        }


        if (order.customerName) {

            summary += `
                <strong>Cliente:</strong>
                ${escapeHTML(order.customerName)}
                <br>
            `;

        }


        if (order.location) {

            summary += `
                <strong>Ubicación:</strong>
                ${escapeHTML(order.location)}
                <br>
            `;

        }


        if (order.date) {

            summary += `
                <strong>Fecha:</strong>
                ${escapeHTML(order.date)}
                <br>
            `;

        }


        if (order.pump) {

            summary += `
                <strong>Bombeo:</strong>
                ${escapeHTML(order.pump)}
                <br>
            `;

        }


        if (order.projectType) {

            summary += `
                <strong>Tipo de obra:</strong>
                ${escapeHTML(order.projectType)}
                <br>
            `;

        }


        if (order.description) {

            summary += `
                <strong>Descripción:</strong>
                ${escapeHTML(order.description)}
                <br>
            `;

        }


        const message =
            buildWhatsAppMessage();


        const whatsappUrl =
            `https://wa.me/${LT_CONFIG.ventas}?text=${encodeURIComponent(message)}`;


        setScreen(`

            <div class="lt-chat-message bot">

                ✅ Perfecto.

                <br><br>

                Preparé el resumen
                de tu solicitud.

            </div>


            <div class="lt-order-summary">

                <h4>
                    🟡 SOLICITUD LT HORMIGONES
                </h4>

                ${summary}

            </div>


            <div class="lt-chat-warning">

                Los cálculos de volumen son
                orientativos y deben verificarse
                según las condiciones reales
                de la obra.

            </div>


            ${whatsappUrl}
                🟢 Enviar solicitud a Ventas
            </a>

        `);

    }


    function buildWhatsAppMessage() {

        const lines = [

            "Hola LT Hormigones 👋",

            "",

            "Quisiera solicitar información / presupuesto."

        ];


        if (order.product) {

            lines.push(
                `📦 Producto / servicio: ${order.product}`
            );

        }


        if (order.concrete) {

            lines.push(
                `🧱 Hormigón: ${order.concrete}`
            );

        }


        if (order.workType) {

            lines.push(
                `🏗️ Elemento: ${order.workType}`
            );

        }


        if (order.volume) {

            lines.push(
                `📐 Volumen estimado: ${order.volume} m³`
            );

        }


        if (order.materialMode) {

            lines.push(
                `🚛 Modalidad: ${order.materialMode}`
            );

        }


        if (order.quantity) {

            lines.push(
                `🔢 Cantidad: ${order.quantity}`
            );

        }


        if (order.machine) {

            lines.push(
                `🚜 Maquinaria: ${order.machine}`
            );

        }


        if (order.machineWork) {

            lines.push(
                `🛠️ Trabajo: ${order.machineWork}`
            );

        }


        if (order.projectType) {

            lines.push(
                `🏗️ Tipo de obra: ${order.projectType}`
            );

        }


        if (order.description) {

            lines.push(
                `📝 Descripción: ${order.description}`
            );

        }


        if (order.pump) {

            lines.push(
                `🚧 Bombeo: ${order.pump}`
            );

        }


        if (order.location) {

            lines.push(
                `📍 Ubicación: ${order.location}`
            );

        }


        if (order.date) {

            lines.push(
                `📅 Fecha estimada: ${order.date}`
            );

        }


        if (order.customerName) {

            lines.push(
                `👤 Nombre: ${order.customerName}`
            );

        }


        lines.push(
            "",
            "Quisiera consultar precio y disponibilidad.",
            "",
            "Muchas gracias."
        );


        return lines.join("\n");

    }


    // ========================================================
    // CONTACTOS DIRECTOS
    // ========================================================

    function contactSales() {

        openWhatsApp(

            LT_CONFIG.ventas,

            "Hola LT Hormigones 👋\n\nQuisiera comunicarme con el sector de Ventas / Logística."

        );

    }


    function contactAdmin() {

        openWhatsApp(

            LT_CONFIG.administracion,

            "Hola LT Hormigones 👋\n\nQuisiera comunicarme con Administración."

        );

    }


    // ========================================================
    // CLICS DINÁMICOS
    // ========================================================

    chatBody.addEventListener(
        "click",
        (event) => {

            const actionButton =
                event.target.closest(
                    "[data-action]"
                );


            if (actionButton) {

                const action =
                    actionButton.dataset.action;


                switch (action) {

                    case "concrete":

                        showConcrete();

                        break;


                    case "aggregates":

                        showAggregates();

                        break;


                    case "machinery":

                        showMachinery();

                        break;


                    case "calculator":

                        showCalculator();

                        break;


                    case "project":

                        showProjectForm();

                        break;


                    case "sales":

                        contactSales();

                        break;


                    case "admin":

                        contactAdmin();

                        break;


                    case "concreteQuote":

                        if (!order.product) {

                            order.product =
                                "Hormigón elaborado";

                        }

                        showQuoteDetails();

                        break;

                }

            }


            const concreteButton =
                event.target.closest(
                    "[data-concrete]"
                );


            if (concreteButton) {

                showConcreteInfo(
                    concreteButton.dataset.concrete
                );

            }


            const calcButton =
                event.target.closest(
                    "[data-calc]"
                );


            if (calcButton) {

                showCalculatorForm(
                    calcButton.dataset.calc
                );

            }


            const materialButton =
                event.target.closest(
                    "[data-material]"
                );


            if (materialButton) {

                selectMaterial(
                    materialButton.dataset.material
                );

            }


            const modeButton =
                event.target.closest(
                    "[data-material-mode]"
                );


            if (modeButton) {

                order.materialMode =
                    modeButton.dataset.materialMode;

                showMaterialQuantity();

            }


            const machineButton =
                event.target.closest(
                    "[data-machine]"
                );


            if (machineButton) {

                selectMachine(
                    machineButton.dataset.machine
                );

            }

        }
    );


    // ========================================================
    // FORMULARIOS DINÁMICOS
    // ========================================================

    chatBody.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            if (
                event.target.id ===
                "lt-volume-form"
            ) {

                calculateVolume(
                    event.target
                );

            }


            if (
                event.target.id ===
                "lt-material-form"
            ) {

                const quantity =
                    document.getElementById(
                        "lt-material-quantity"
                    ).value.trim();


                if (!quantity) {
                    return;
                }


                order.quantity =
                    quantity;


                showQuoteDetails();

            }


            if (
                event.target.id ===
                "lt-machine-form"
            ) {

                const work =
                    document.getElementById(
                        "lt-machine-work"
                    ).value.trim();


                if (!work) {
                    return;
                }


                order.machineWork =
                    work;


                showQuoteDetails();

            }


            if (
                event.target.id ===
                "lt-quote-form"
            ) {

                order.customerName =
                    document.getElementById(
                        "lt-customer-name"
                    ).value.trim();


                order.location =
                    document.getElementById(
                        "lt-location"
                    ).value.trim();


                order.date =
                    document.getElementById(
                        "lt-date"
                    ).value;


                order.pump =
                    document.getElementById(
                        "lt-pump"
                    ).value;


                showSummary();

            }


            if (
                event.target.id ===
                "lt-project-form"
            ) {

                order.customerName =
                    document.getElementById(
                        "lt-project-name"
                    ).value.trim();


                order.location =
                    document.getElementById(
                        "lt-project-location"
                    ).value.trim();


                order.projectType =
                    document.getElementById(
                        "lt-project-type"
                    ).value.trim();


                order.description =
                    document.getElementById(
                        "lt-project-description"
                    ).value.trim();


                order.date =
                    document.getElementById(
                        "lt-project-date"
                    ).value;


                showSummary();

            }

        }
    );


    // ========================================================
    // BOTONES INICIO / VOLVER
    // ========================================================

    if (chatHome) {

        chatHome.addEventListener(
            "click",
            showHome
        );

    }


    if (chatBack) {

        chatBack.addEventListener(
            "click",
            () => {

                if (!history.length) {

                    showHome();

                    return;
                }


                chatBody.innerHTML =
                    history.pop();


                scrollChat();

            }
        );

    }


    // ========================================================
    // ESC
    // ========================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                chatWindow.classList.contains(
                    "is-open"
                )
            ) {

                closeChat();

            }

        }
    );


    // ========================================================
    // INICIO
    // ========================================================

    showHome();

});
