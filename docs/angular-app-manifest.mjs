
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
    'index.csr.html': {size: 1945, hash: '52e3ff9e8835e5c2f393ee5486c8e0322e44d899b973259f76cbcaa392bbac45', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1022, hash: '8115661617253f9bd61424718da882959fe047d53001ff4ca87ee8e2adffe2db', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 102303, hash: 'aee7f5db21f176229011ba897370ded0d4549d82e9e9eb2bebb729182d2be4a5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6OASV2AJ.css': {size: 18483, hash: '+tAOSCfHgUc', text: () => import('./assets-chunks/styles-6OASV2AJ_css.mjs').then(m => m.default)}
  },
};
