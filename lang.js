/* ════════════════════════════════════════════════════════════
   INICS 언어 전환 도우미 (한국어 페이지 · /en/ 영문 페이지 공용)
   · 메뉴 오른쪽 "한국어 | EN" 전환 버튼의 모양을 잡아 줍니다.
   · 방문자 브라우저 언어가 페이지 언어와 다르면 맨 위에 안내 배너를 띄웁니다.
       - 한국어 페이지 + 한국어가 아닌 브라우저 → "English version available"
       - 영문 페이지   + 한국어 브라우저        → "KR 한국어 페이지가 있습니다"
   · 자동 이동(리다이렉트)은 절대 하지 않습니다. 방문자가 직접 누를 때만 이동합니다.
   · 닫기 / 선택은 localStorage 에 기억해 다시 띄우지 않습니다.
   ════════════════════════════════════════════════════════════ */
(function () {
  var KEY = 'inics-lang-banner';

  var css =
    'header nav ul li.lang-switch{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:700;white-space:nowrap}' +
    '.lang-switch .lang-cur{color:#FF7F00}' +
    '.lang-switch .lang-sep{color:#c8c8c8;font-weight:400}' +
    'header nav ul li.lang-switch>a{color:#777;font-weight:600}' +
    'header nav ul li.lang-switch>a:hover{color:#FF7F00}' +
    '@media (max-width:768px){header nav ul li.lang-switch{padding:14px 20px;box-sizing:border-box}' +
    'header nav ul>li.lang-switch>a{display:inline;width:auto;padding:0;font-size:13px}}' +
    '.lang-banner{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 14px;' +
    'padding:9px 16px;background:#1b1b1b;color:#fff;font-size:14px;line-height:1.4;letter-spacing:0;' +
    'font-family:"Pretendard",-apple-system,BlinkMacSystemFont,system-ui,Roboto,sans-serif}' +
    '.lang-banner .lb-kr{display:inline-block;margin-right:8px;padding:1px 6px;border:1px solid #777;border-radius:3px;font-size:11px;font-weight:700;letter-spacing:.5px}' +
    '.lang-banner a.lb-go{background:#FF7F00;color:#fff;font-weight:700;text-decoration:none;padding:5px 14px;border-radius:4px}' +
    '.lang-banner a.lb-go:hover{background:#E06600}' +
    '.lang-banner button.lb-close{background:none;border:1px solid #666;color:#ddd;font:inherit;font-size:13px;padding:4px 12px;border-radius:4px;cursor:pointer}' +
    '.lang-banner button.lb-close:hover{border-color:#aaa;color:#fff}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var link = document.querySelector('.lang-switch a');
  if (!link) return;

  var seen = null;
  try { seen = localStorage.getItem(KEY); } catch (e) {}
  if (seen) return;

  var pageLang = (document.documentElement.lang || 'ko').toLowerCase().slice(0, 2);
  var browser = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
  if (!browser) return;
  var browserKo = browser.indexOf('ko') === 0;

  var t;
  if (pageLang === 'en' && browserKo) {
    t = { lang: 'ko', kr: true, msg: '한국어 페이지가 있습니다', go: '한국어로 보기', close: '닫기', label: '언어 안내' };
  } else if (pageLang === 'ko' && !browserKo) {
    t = { lang: 'en', kr: false, msg: 'English version available', go: 'View in English', close: 'Close', label: 'Language notice' };
  } else {
    return;
  }

  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var bar = document.createElement('div');
  bar.className = 'lang-banner';
  bar.lang = t.lang;
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', t.label);
  bar.setAttribute('data-nosnippet', '');

  var msg = document.createElement('span');
  if (t.kr) {
    var kr = document.createElement('span');
    kr.className = 'lb-kr';
    kr.textContent = 'KR';
    msg.appendChild(kr);
  }
  msg.appendChild(document.createTextNode(t.msg));

  var go = document.createElement('a');
  go.className = 'lb-go';
  go.href = link.getAttribute('href');
  go.textContent = t.go;
  go.addEventListener('click', function () { remember('chosen'); });

  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'lb-close';
  close.textContent = t.close;
  close.addEventListener('click', function () {
    remember('closed');
    if (bar.parentNode) bar.parentNode.removeChild(bar);
  });

  bar.appendChild(msg);
  bar.appendChild(go);
  bar.appendChild(close);
  document.body.insertBefore(bar, document.body.firstChild);
})();
