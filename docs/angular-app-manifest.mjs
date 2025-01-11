
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/dardos/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/dardos"
  }
],
  assets: {
    'index.csr.html': {size: 1945, hash: '11ee093c9ff54f1bccc45b30f4926a619ffbd2f1ab343915bc0d3a0380dc9e86', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1022, hash: '7b7deccda60d183bca725da29a98eb1891c3d861f2e5b28478431b2e09422090', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 102303, hash: 'b100ba0bedde510acd4b1abe5ee1c8538d67c7dc55fa8837a378613ad8577b0c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6OASV2AJ.css': {size: 18483, hash: '+tAOSCfHgUc', text: () => import('./assets-chunks/styles-6OASV2AJ_css.mjs').then(m => m.default)}
  },
};
