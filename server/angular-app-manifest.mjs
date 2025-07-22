
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://yusafzai-eng.github.io/Yallah-Dubai-Tourism-Angular/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/products/*"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/city"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/card"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/login"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/invalid"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/sinup"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/main"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/citytour"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/aboutus"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/corporate"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/local"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/Product_details"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/producttable"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/Users"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/Orders"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/Add-Products"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/products"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/edit/*"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/user-details/*"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/user-Order-details/*"
  },
  {
    "renderMode": 0,
    "route": "/Yallah-Dubai-Tourism-Angular/admin/carddetails/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1257, hash: '85f0372fcdc369a4262ea1aaba3288dbb3f613fd604a9c92e962e9006e3b2c58', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1575, hash: 'ce4ebccd6d3b4ea23162774aa71298ddf33daa66179132d191516b46e93dce96', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-HPNLQLSF.css': {size: 17997, hash: 'pu6pG6Clk88', text: () => import('./assets-chunks/styles-HPNLQLSF_css.mjs').then(m => m.default)}
  },
};
