// ==========================================
// アンカースクロール
// ==========================================

const HEADER_HEIGHT =
  parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height'), 10) || 80;

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
  hamburger?.setAttribute('aria-expanded', 'false');
  hamburger?.setAttribute('aria-label', 'メニューを開く');
}

hamburger?.addEventListener('click', (e) => {
  e.stopPropagation();

  const isOpen = nav?.classList.toggle('active');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(!!isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

nav?.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
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


// ==========================================
// 文化祭バナー（×で閉じる・同一セッション中は再表示しない）
// ==========================================

(function () {
  const banner = document.getElementById('eventBanner');
  const closeBtn = document.getElementById('eventBannerClose');
  const KEY = 'eventBannerClosed';

  if (!banner) return;

  let closed = false;
  try {
    closed = sessionStorage.getItem(KEY) === '1';
  } catch (e) { /* ストレージ不可でも表示は続行 */ }

  banner.hidden = closed;

  closeBtn?.addEventListener('click', () => {
    banner.hidden = true;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch (e) { /* 無視 */ }
  });
})();
