
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
    'index.csr.html': {size: 1945, hash: '79020b2e9b8ab16cb291dbf35c4f776d4c864cc20673e4a67ef7ab93c782a08d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1022, hash: 'fb887add069b12894b407bfb243383c79c3b687acd68809bf6a280311401f6fc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 102109, hash: 'f158c6c4216eaaa03ae41c3e423a21991c0624841b46efc4cd2f22beb8ca8e00', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ZQVI77LT.css': {size: 18404, hash: 'qKp5b0AoVkY', text: () => import('./assets-chunks/styles-ZQVI77LT_css.mjs').then(m => m.default)}
  },
};
