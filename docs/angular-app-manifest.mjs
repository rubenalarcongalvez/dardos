
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
    'index.csr.html': {size: 1945, hash: '8f02455fc3c481dfb24298be6ff6bbe66de80f07f66d134335e4ab7507d76941', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1022, hash: '78d6e0bba505971e9ec24cf82da6db53a90afa54e03462a96b0f69927ebaf909', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 102285, hash: '0781864952fe792a623c35080c8410c0af3580945f8bbb568032f6d6536c337d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6OASV2AJ.css': {size: 18483, hash: '+tAOSCfHgUc', text: () => import('./assets-chunks/styles-6OASV2AJ_css.mjs').then(m => m.default)}
  },
};
