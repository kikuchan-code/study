// ==========================================
// アンカースクロール
// ==========================================

const HEADER_HEIGHT = 80;

function scrollWithOffset(targetId) {
  const target = document.querySelector(targetId);

  if (!target) return;

  const offsetPosition =
    target.offsetTop - HEADER_HEIGHT;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {
      e.preventDefault();
      scrollWithOffset(targetId);
    }
  });
});


// ==========================================
// ハンバーガーメニュー
// ==========================================

const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');

function closeMenu() {
  nav?.classList.remove('active');
  hamburger?.classList.remove('open');
}

hamburger?.addEventListener('click', (e) => {
  e.stopPropagation();

  nav?.classList.toggle('active');
  hamburger.classList.toggle('open');
});

nav?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    closeMenu();
  }
});

document.addEventListener('click', (e) => {
  if (
    nav &&
    hamburger &&
    !nav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});


// ==========================================
// Topへ戻るボタン
// ==========================================

const toTopBtn =
  document.getElementById("toTopBtn");

if (toTopBtn) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {
      toTopBtn.classList.add("show");
    } else {
      toTopBtn.classList.remove("show");
    }

  }, { passive: true });

  toTopBtn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });
}