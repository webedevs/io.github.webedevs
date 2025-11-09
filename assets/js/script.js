// Проверка существования элементов перед использованием
const scrollTopBtn = document.getElementById("scrollTopBtn");
const yearElement = document.getElementById("year");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

// Инициализация кнопки "Scroll to top"
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Обновление года в футере
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = currentYear;
}

// Обработка скролла
window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
  updateActiveLink();
  checkSectionVisibility();
});

// Плавная прокрутка по навигационным ссылкам
if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href")?.substring(1);
      if (!targetId) return;
      
      const target = document.getElementById(targetId);
      if (!target) return;
      
      const offset = 80; // высота меню
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

// Обновление активной ссылки в навигации
function updateActiveLink() {
  if (sections.length === 0 || navLinks.length === 0) return;
  
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

// Анимация появления секций при скролле
function checkSectionVisibility() {
  if (sections.length === 0) return;
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
    
    if (isVisible) {
      section.classList.add("visible");
    }
  });
}

// Показываем первую секцию сразу при загрузке
window.addEventListener("load", () => {
  checkSectionVisibility();
  // Если первая секция уже видна, показываем её сразу
  if (sections.length > 0) {
    const firstSection = sections[0];
    const rect = firstSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      firstSection.classList.add("visible");
    }
  }
});

// Инициализация при загрузке страницы
checkSectionVisibility();