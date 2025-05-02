let isMobile = window.innerWidth <= 768;
let scrollHandler = null;

document.addEventListener("DOMContentLoaded", function () {
    if (isMobile) {
        enableMobileScrollBehavior();
    }

    window.addEventListener("resize", function () {
        if (window.innerWidth <= 768 && !isMobile) {
            isMobile = true;
            enableMobileScrollBehavior();
        } else if (window.innerWidth > 768 && isMobile) {
            isMobile = false;
            disableMobileScrollBehavior();
            resetHeaderPosition();
            resetMenuStyles();
        }
    });
});

// Enable scroll-to-hide for mobile
function enableMobileScrollBehavior() {
    const header = document.querySelector(".header");
    if (!header) return;

    header.style.transition = "transform 0.3s ease-in-out";
    let lastScrollTop = 0;

    scrollHandler = function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", scrollHandler);
}

// Disable mobile scroll behavior and clean up
function disableMobileScrollBehavior() {
    if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
    }
}

// Reset header transform for desktop
function resetHeaderPosition() {
    const header = document.querySelector(".header");
    if (header) {
        header.style.transform = ""; // Clear transform
    }
}

// Reset menu and scroll
function resetMenuStyles() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.classList.remove("active");
    }
    document.body.style.overflow = "auto";
}

// Toggle menu (only for mobile)
function toggleMenu() {
    if (window.innerWidth > 768) return;

    const menu = document.getElementById("menu");
    const isActive = menu.classList.toggle("active");
    document.body.style.overflow = isActive ? "hidden" : "auto";
}
