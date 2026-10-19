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
