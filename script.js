document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       STAR BACKGROUND SYSTEM
    =============================== */

    const starsContainer = document.getElementById("stars-container");
    const starCount = 180;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2.5;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = Math.random() * 0.7 + 0.3;

        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 5;

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


    /* ===============================
       NAVIGATION SYSTEM
    =============================== */

    const docsBtn = document.getElementById("docsBtn");
    const communityBtn = document.getElementById("communityBtn");
    const memesBtn = document.getElementById("memesBtn");

    const heroContent = document.getElementById("heroContent");
    const communityGallery = document.getElementById("communityGallery");
    const memesGallery = document.getElementById("memesGallery");

    function setActive(button) {
        docsBtn.classList.remove("active");
        communityBtn.classList.remove("active");
        memesBtn.classList.remove("active");
        button.classList.add("active");
    }

    function showSection(section) {
        heroContent.style.display = "none";
        communityGallery.style.display = "none";
        memesGallery.style.display = "none";
        section.style.display = "flex";
    }

    docsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setActive(docsBtn);
        heroContent.style.display = "block";
        communityGallery.style.display = "none";
        memesGallery.style.display = "none";
    });

    communityBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setActive(communityBtn);
        showSection(communityGallery);
    });

    memesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setActive(memesBtn);
        showSection(memesGallery);
    });


    /* ===============================
       MEME VOTING SYSTEM
    =============================== */

    const memeCards = document.querySelectorAll("#memesGallery .meme-card");
    const memesContainer = document.querySelector("#memesGallery .gallery-grid");

    let votes = JSON.parse(localStorage.getItem("memeVotes")) || {};
    let hasVoted = localStorage.getItem("hasVoted");

    function animateNumber(element, start, end, duration = 400) {
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            let progress = currentTime - startTime;

            let value = Math.min(
                start + Math.floor((progress / duration) * (end - start)),
                end
            );

            element.textContent = value;

            if (progress < duration) {
                requestAnimationFrame(animation);
            } else {
                element.textContent = end;
            }
        }

        requestAnimationFrame(animation);
    }

    function sortMemes() {
        const items = Array.from(memesContainer.children);

        items.sort((a, b) => {
            return votes[b.dataset.id] - votes[a.dataset.id];
        });

        items.forEach(item => memesContainer.appendChild(item));
        updateRanks();
    }

    function updateRanks() {
        const items = Array.from(memesContainer.children);

        items.forEach(card => {
            card.classList.remove("rank-1", "rank-2", "rank-3");
        });

        if (items[0]) items[0].classList.add("rank-1");
        if (items[1]) items[1].classList.add("rank-2");
        if (items[2]) items[2].classList.add("rank-3");
    }

    memeCards.forEach(card => {
        const id = card.dataset.id;
        const countEl = card.querySelector(".vote-count");

        if (!votes[id]) votes[id] = 0;
        countEl.textContent = votes[id];

        card.querySelector(".meme-item").addEventListener("click", (e) => {
            e.preventDefault();
            if (hasVoted) return;

            const oldValue = votes[id];
            votes[id]++;

            localStorage.setItem("memeVotes", JSON.stringify(votes));
            localStorage.setItem("hasVoted", "true");

            hasVoted = true;

            card.classList.add("voted");
            animateNumber(countEl, oldValue, votes[id]);

            sortMemes();
        });
    });

    sortMemes();

});
/* ===============================
   MOUSE LIGHT TRACKING
=============================== */

const title = document.querySelector(".hero-title");

document.addEventListener("mousemove", (e) => {

    const rect = title.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    title.style.setProperty("--mouse-x", x + "%");
    title.style.setProperty("--mouse-y", y + "%");
});
