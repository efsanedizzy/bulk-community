document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars-container");
    const starCount = 180; // Yıldız sayısını biraz artırdım

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Rastgele Konum
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Rastgele Boyut (Daha çeşitli boyutlar)
        const size = Math.random() * 2.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Rastgele Opaklık Başlangıcı
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Rastgele Animasyon Süresi ve Gecikme
        const duration = Math.random() * 4 + 3; // 3-7s arası
        const delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        star.style.animation = `twinkle ${duration}s infinite ${delay}s ease-in-out alternate`;

        starsContainer.appendChild(star);
    }

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.3); }
        }
    `;
    document.head.appendChild(styleSheet);
});
// COMMUNITY & DOCS SWITCH SYSTEM
const communityBtn = document.getElementById("communityBtn");
const docsBtn = document.getElementById("docsBtn");
const heroContent = document.getElementById("heroContent");
const gallery = document.getElementById("communityGallery");

// Community Arts tıklandığında
communityBtn.addEventListener("click", function(e) {
    e.preventDefault();

    heroContent.style.display = "none";
    gallery.style.display = "flex";

    communityBtn.classList.add("active");
    docsBtn.classList.remove("active");
});

// Docs tıklandığında
docsBtn.addEventListener("click", function(e) {
    e.preventDefault();

    gallery.style.display = "none";
    heroContent.style.display = "block";

    docsBtn.classList.add("active");
    communityBtn.classList.remove("active");
});
