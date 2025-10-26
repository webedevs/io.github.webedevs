document.getElementById("scrollTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTopBtn");
  btn.style.display = window.scrollY > 300 ? "block" : "none";
  updateActiveLink();
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    const offset = 80; // высота меню
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function updateActiveLink() {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

const currentYear = new Date().getFullYear();
document.getElementById("year").innerHTML = currentYear;