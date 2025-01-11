
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
    'index.csr.html': {size: 1946, hash: 'e6abcf60506278ec9243265d10fdc05a1be91fe7450b73c2759d40709ac830cc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1023, hash: '6a2c8e83b706184a258191601ab2359d23829f88c51b08bf6e353c3c390c9f14', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 102117, hash: 'b8d514f6577eea13bf898af56a9301d43fdd15dbee5b3aec5d1de28e5a3f483c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-BAUMNQ5R.css': {size: 18402, hash: 'lgOQTfR/e8A', text: () => import('./assets-chunks/styles-BAUMNQ5R_css.mjs').then(m => m.default)}
  },
};
