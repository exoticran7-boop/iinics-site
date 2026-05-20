/* ============================================================
 * 아이닉스(INICS) 홈페이지 자동 번역 위젯
 * www.iinics.co.kr
 * ------------------------------------------------------------
 * 지원 언어: 영어, 중국어(간체/번체), 일본어, 베트남어, 러시아어
 * 방문자 브라우저 언어를 자동 감지하여 해당 언어로 번역
 * ============================================================ */

(function () {
  'use strict';

  // ===== 1. CSS 스타일 삽입 =====
  var style = document.createElement('style');
  style.textContent =
    '#google_translate_element {' +
    '  position: fixed;' +
    '  top: 10px;' +
    '  right: 10px;' +
    '  z-index: 9999;' +
    '  background: white;' +
    '  padding: 5px 8px;' +
    '  border-radius: 5px;' +
    '  box-shadow: 0 2px 5px rgba(0,0,0,0.2);' +
    '  font-size: 13px;' +
    '}' +
    '#google_translate_element .goog-te-gadget {' +
    '  font-size: 0 !important;' +
    '}' +
    '#google_translate_element .goog-te-gadget-simple {' +
    '  background-color: #fff !important;' +
    '  border: 1px solid #ddd !important;' +
    '  padding: 4px 6px !important;' +
    '  border-radius: 3px !important;' +
    '  font-size: 13px !important;' +
    '}' +
    '#google_translate_element img { display: none !important; }' +
    '@media (max-width: 768px) {' +
    '  #google_translate_element {' +
    '    top: auto;' +
    '    bottom: 10px;' +
    '    right: 10px;' +
    '    transform: scale(0.9);' +
    '    transform-origin: bottom right;' +
    '  }' +
    '}' +
    /* Google이 자동으로 추가하는 상단 바 숨김 */
    'body { top: 0 !important; position: static !important; }' +
    '.skiptranslate iframe { display: none !important; }' +
    '.goog-te-banner-frame { display: none !important; }' +
    '.goog-tooltip, .goog-tooltip:hover { display: none !important; }' +
    '.goog-text-highlight { background: none !important; box-shadow: none !important; }';
  document.head.appendChild(style);

  // ===== 2. 위젯 표시 영역 (div) 삽입 =====
  function insertWidget() {
    if (document.getElementById('google_translate_element')) return;
    var div = document.createElement('div');
    div.id = 'google_translate_element';
    document.body.appendChild(div);
  }

  if (document.body) {
    insertWidget();
  } else {
    document.addEventListener('DOMContentLoaded', insertWidget);
  }

  // ===== 3. Google Translate 초기화 함수 (전역) =====
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'ko',
        includedLanguages: 'en,zh-CN,zh-TW,ja,vi,ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'google_translate_element'
    );

    // ===== 4. 방문자 브라우저 언어 자동 감지 =====
    var userLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var targetLang = '';

    if (userLang.indexOf('ko') === 0) {
      // 한국어 사용자는 번역하지 않음
      targetLang = '';
    } else if (userLang.indexOf('zh-cn') === 0 || userLang === 'zh' || userLang.indexOf('zh-sg') === 0) {
      targetLang = 'zh-CN';
    } else if (userLang.indexOf('zh-tw') === 0 || userLang.indexOf('zh-hk') === 0 || userLang.indexOf('zh-mo') === 0) {
      targetLang = 'zh-TW';
    } else if (userLang.indexOf('ja') === 0) {
      targetLang = 'ja';
    } else if (userLang.indexOf('vi') === 0) {
      targetLang = 'vi';
    } else if (userLang.indexOf('ru') === 0) {
      targetLang = 'ru';
    } else if (userLang.indexOf('en') === 0) {
      targetLang = 'en';
    } else {
      // 기타 언어 사용자는 영어로 번역
      targetLang = 'en';
    }

    // ===== 5. 자동 번역 실행 =====
    if (targetLang && !sessionStorage.getItem('inics_translated')) {
      sessionStorage.setItem('inics_translated', '1');
      var cookieValue = '/ko/' + targetLang;
      document.cookie = 'googtrans=' + cookieValue + '; path=/';
      document.cookie = 'googtrans=' + cookieValue + '; domain=.iinics.co.kr; path=/';
      document.cookie = 'googtrans=' + cookieValue + '; domain=iinics.co.kr; path=/';
      // 페이지 새로고침으로 번역 적용
      setTimeout(function () {
        location.reload();
      }, 100);
    }
  };

  // ===== 6. Google Translate 스크립트 로드 =====
  var script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body
    ? document.body.appendChild(script)
    : document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(script);
      });
})();
