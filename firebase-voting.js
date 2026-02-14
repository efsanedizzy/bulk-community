import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore,
    doc,
    updateDoc,
    increment,
    onSnapshot,
    collection
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmysMG6F9vxFEGFaMvfzA8V_2Jws3OebA",
  authDomain: "bulkcommunity-ef329.firebaseapp.com",
  projectId: "bulkcommunity-ef329",
  storageBucket: "bulkcommunity-ef329.firebasestorage.app",
  messagingSenderId: "877955945403",
  appId: "1:877955945403:web:453c356b4ff7ef9505ea9e",
  measurementId: "G-WN5QGZWYRL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.vote = async function (memeId) {

    if (localStorage.getItem("hasVoted")) {
        alert("You already voted!");
        return;
    }

    const voteRef = doc(db, "votes", memeId);

    await updateDoc(voteRef, {
        count: increment(1)
    });

    localStorage.setItem("hasVoted", "true");
};

document.addEventListener("DOMContentLoaded", () => {

    const memesContainer = document.querySelector("#memesGallery .gallery-grid");
    const votesCollection = collection(db, "votes");

    onSnapshot(votesCollection, (snapshot) => {

        let voteData = [];

        snapshot.forEach((docSnap) => {
            voteData.push({
                id: docSnap.id,
                count: docSnap.data().count
            });
        });

        voteData.sort((a, b) => b.count - a.count);

        voteData.forEach(data => {

            const card = document.querySelector(`.meme-card[data-id="${data.id}"]`);
            if (!card) return;

            const countEl = card.querySelector(".vote-count");
            countEl.textContent = data.count;

            memesContainer.appendChild(card);
        });
    });

});
