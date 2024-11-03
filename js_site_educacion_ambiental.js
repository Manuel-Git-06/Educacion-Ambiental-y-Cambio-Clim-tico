document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    const indiceSection = document.querySelector(".indice");

    function animateTimelineItems() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;

            if (itemTop < triggerBottom) {
                item.classList.add("visible");
            } else {
                item.classList.remove("visible");
            }
        });

        const indiceTop = indiceSection.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;

        if (indiceTop < triggerBottom) {
            indiceSection.classList.add("visible");
        } else {
            indiceSection.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", animateTimelineItems);
    window.addEventListener("resize", animateTimelineItems);
    animateTimelineItems();

    // Configuración de partículas
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#4CAF50"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#4CAF50",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            }
        },
        retina_detect: true
    });
});
