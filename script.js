const weddingDate = new Date("2026-11-28T13:00:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = weddingDate - now;
  const fields = ["days", "hours", "minutes", "seconds"];
  if (diff <= 0) {
    fields.forEach(id => document.getElementById(id).textContent = "0");
    return;
  }
  document.getElementById("days").textContent = Math.floor(diff / 86400000);
  document.getElementById("hours").textContent = Math.floor((diff % 86400000) / 3600000);
  document.getElementById("minutes").textContent = Math.floor((diff % 3600000) / 60000);
  document.getElementById("seconds").textContent = Math.floor((diff % 60000) / 1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

const wishForm = document.getElementById("wish-form");
const wishList = document.getElementById("wish-list");
const storageKey = "ucapan-sigit-putri-v1";

function renderWishes() {
  let wishes = [];
  try { wishes = JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch (_) {}
  wishList.replaceChildren();
  wishes.slice().reverse().forEach(item => {
    const article = document.createElement("article");
    article.className = "wish-item";
    const name = document.createElement("strong");
    name.textContent = item.name;
    const message = document.createElement("p");
    message.textContent = item.message;
    article.append(name, message);
    wishList.append(article);
  });
}
wishForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("guest-name").value.trim();
  const message = document.getElementById("guest-message").value.trim();
  if (!name || !message) return;
  let wishes = [];
  try { wishes = JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch (_) {}
  wishes.push({ name, message, createdAt: new Date().toISOString() });
  try { localStorage.setItem(storageKey, JSON.stringify(wishes)); } catch (_) {
    alert("Ucapan tidak dapat disimpan di browser ini.");
    return;
  }
  wishForm.reset();
  renderWishes();
});
renderWishes();

document.getElementById("rsvp-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("rsvp-name").value.trim();
  const attendance = document.getElementById("attendance").value;
  const count = document.getElementById("guest-count").value;
  const message = `Assalamu'alaikum, saya ingin konfirmasi undangan pernikahan Sigit & Putri.%0A%0ANama: ${encodeURIComponent(name)}%0AKehadiran: ${encodeURIComponent(attendance)}%0Jumlah tamu: ${encodeURIComponent(count)}`;
  window.open(`https://wa.me/6285749267989?text=${message}`, "_blank", "noopener,noreferrer");
});
