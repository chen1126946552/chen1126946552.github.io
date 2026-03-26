(function () {
  // ============ 统一配置，修改这里即可 ============
  var DOMAIN = 'https://devjs.ptengine.com';
  var COMMON_SCRIPTS = ['19ky1yoe'];
  // 特定页面加载额外脚本（路径匹配）
  var PAGE_EXTRA_SCRIPTS = {
    '/index.html': ['7fvr8iz1'],
    '/': ['7fvr8iz1']
  };
  // =============================================

  var path = window.location.pathname;
  var ids = COMMON_SCRIPTS.slice();

  var extra = PAGE_EXTRA_SCRIPTS[path];
  if (extra) {
    ids = ids.concat(extra);
  }

  ids.forEach(function (id) {
    var script = document.createElement('script');
    script.src = DOMAIN + '/' + id + '.js';
    document.head.appendChild(script);
  });
})();
