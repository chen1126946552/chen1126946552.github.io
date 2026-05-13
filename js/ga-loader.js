(function () {
  // ============ 统一配置，修改这里即可 ============
  var COMMON_IDS = ['G-8Z5LM4WKJ5'];
  // 特定页面加载额外 GA 测量 ID（路径匹配）
  var PAGE_EXTRA_IDS = {
    // '/index.html': ['G-XXXXXXX'],
    // '/': ['G-XXXXXXX']
  };
  // =============================================

  var path = window.location.pathname;
  var ids = COMMON_IDS.slice();

  var extra = PAGE_EXTRA_IDS[path];
  if (extra) {
    ids = ids.concat(extra);
  }

  if (ids.length === 0) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // 仅加载一次 gtag.js（使用第一个 ID）
  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + ids[0];
  document.head.appendChild(loader);

  gtag('js', new Date());
  ids.forEach(function (id) {
    gtag('config', id);
  });
})();
