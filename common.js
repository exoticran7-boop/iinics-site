/* ════════════════════════════════════════════════════════════
   INICS — common.js
   모든 페이지 공통 스크립트 (모바일 네비게이션)

   ★ 각 페이지에 정적 #hamburger 버튼 + 인라인 스크립트가
     이미 있는 경우, 이 파일은 동적 버튼(.nav-toggle)을
     생성하지 않고 active 자동 처리만 수행합니다.
     (버튼 중복 생성 방지 가드)
   ★ 브레이크포인트는 사이트 공통 768px로 통일.
════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 모바일 햄버거 버튼 동적 생성 ──
     정적 #hamburger 또는 기존 .nav-toggle이 이미 있으면 건너뜀 */
  const header = document.querySelector('header');
  const nav    = document.querySelector('header nav');
  const hasStaticHamburger = document.getElementById('hamburger') !== null;
  const hasNavToggle = document.querySelector('header .nav-toggle') !== null;

  if (header && nav && !hasStaticHamburger && !hasNavToggle) {

    /* 버튼 생성 */
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', '메뉴 열기');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    /* 헤더에 삽입 (nav 앞) */
    header.insertBefore(toggle, nav);

    /* 클릭 이벤트 */
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* 메뉴 외부 클릭 시 닫기 */
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    /* ESC 키로 닫기 */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    /* 윈도우 리사이즈 시 초기화 — ★ 사이트 공통 768px 기준으로 통일 */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

  }

  /* ── 현재 페이지 네비 active 자동 처리 ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && href !== '#' && href === currentPath) {
      a.classList.add('active');
    }
  });

});