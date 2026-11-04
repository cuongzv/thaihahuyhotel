// Nạp các partial HTML vào vị trí [data-include]
document.addEventListener("DOMContentLoaded", async () => {
  const slots = document.querySelectorAll("[data-include]");
  await Promise.all(
    [...slots].map(async (el) => {
      try {
        const res = await fetch(el.getAttribute("data-include"));
        if (res.ok) el.innerHTML = await res.text();
      } catch (e) {
        console.warn("Không nạp được partial:", el.getAttribute("data-include"));
      }
    })
  );

  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // Năm hiện tại ở footer
  document.querySelectorAll(".js-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

// ---------- Gallery ảnh phòng (bấm vào ảnh thẻ phòng để xem toàn bộ) ----------
const ROOM_GALLERIES = {
  standard: [
    "images/Standard/Standard-1-bed-01.jpg",
    "images/Standard/Standard1bed-02.jpg",
    "images/Standard/Standard1bed-03.jpg",
    "images/Standard/Standard1bed-04.jpg",
    "images/Standard/Standard1bed-05.jpg",
    "images/Standard/Standard1bed-06.jpg",
    "images/Standard/Standard1bed-07.jpg",
    "images/Standard/Standard1bed-08.jpg",
    "images/Standard/Standard1bed-09.jpg",
    "images/Standard/Standard1bed-10.jpg",
    "images/Standard/Standard-2-01.jpg",
    "images/Standard/Standard-2-02.jpg",
    "images/Standard/Standard-2-03.jpg",
    "images/Standard/Standard-2-04.jpg"
  ],
  vip: [
    "images/Vip/Vip%20%281%29.jpg",
    "images/Vip/Vip%20%282%29.jpg",
    "images/Vip/Vip%20%283%29.jpg"
  ],
  deluxe: [
    "images/Deluxe/Deluxe-01.jpg",
    "images/Deluxe/Deluxe-02.jpg"
  ],
  family: [
    "images/Family/Family%20%281%29.jpg",
    "images/Family/Family%20%282%29.jpg",
    "images/Family/Family%20%283%29.jpg",
    "images/Family/Family%20%284%29.jpg",
    "images/Family/Family%20%285%29.jpg",
    "images/Family/Family%20%286%29.jpg",
    "images/Family/Family%20%287%29.jpg",
    "images/Family/Family%20%288%29.jpg",
    "images/Family/Family%20%289%29.jpg",
    "images/Family/Family%20%281%29.mp4"
  ]
};

let lbItems = [], lbIndex = 0, lbBox = null;

function openRoomGallery(key) {
  const items = ROOM_GALLERIES[key];
  if (!items || !items.length) return;
  lbItems = items; lbIndex = 0;
  if (!lbBox) {
    lbBox = document.createElement("div");
    lbBox.className = "lightbox";
    lbBox.innerHTML =
      '<button class="lightbox-close" aria-label="Đóng">×</button>' +
      '<button class="lightbox-prev" aria-label="Ảnh trước">‹</button>' +
      '<div class="lightbox-media"></div>' +
      '<button class="lightbox-next" aria-label="Ảnh sau">›</button>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(lbBox);
    lbBox.querySelector(".lightbox-close").addEventListener("click", closeRoomGallery);
    lbBox.querySelector(".lightbox-prev").addEventListener("click", (e) => { e.stopPropagation(); showRoomMedia(lbIndex - 1); });
    lbBox.querySelector(".lightbox-next").addEventListener("click", (e) => { e.stopPropagation(); showRoomMedia(lbIndex + 1); });
    lbBox.addEventListener("click", (e) => { if (e.target === lbBox) closeRoomGallery(); });
    let touchX = null;
    lbBox.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lbBox.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) showRoomMedia(lbIndex + (dx < 0 ? 1 : -1));
      touchX = null;
    }, { passive: true });
  }
  lbBox.classList.add("open");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onRoomGalleryKey);
  showRoomMedia(0);
}

function showRoomMedia(i) {
  if (!lbItems.length) return;
  lbIndex = (i + lbItems.length) % lbItems.length;
  const src = lbItems[lbIndex];
  const media = lbBox.querySelector(".lightbox-media");
  if (src.toLowerCase().endsWith(".mp4")) {
    media.innerHTML = '<video src="' + src + '" controls autoplay muted playsinline></video>';
  } else {
    media.innerHTML = '<img src="' + src + '" alt="Ảnh phòng ' + (lbIndex + 1) + '">';
  }
  lbBox.querySelector(".lightbox-counter").textContent = (lbIndex + 1) + " / " + lbItems.length;
}

function onRoomGalleryKey(e) {
  if (e.key === "Escape") closeRoomGallery();
  if (e.key === "ArrowLeft") showRoomMedia(lbIndex - 1);
  if (e.key === "ArrowRight") showRoomMedia(lbIndex + 1);
}

function closeRoomGallery() {
  if (!lbBox) return;
  lbBox.classList.remove("open");
  lbBox.querySelector(".lightbox-media").innerHTML = "";
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onRoomGalleryKey);
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest ? e.target.closest("[data-gallery]") : null;
  if (trigger) openRoomGallery(trigger.getAttribute("data-gallery"));
});
