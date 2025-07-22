
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://yusafzai-eng.github.io/YallahDubaiTourism/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/products/*"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/city"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/card"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/login"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/invalid"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/sinup"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/main"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/citytour"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/aboutus"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/corporate"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/local"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/Product_details"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/producttable"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/Users"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/Orders"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/Add-Products"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/products"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/edit/*"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/user-details/*"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/user-Order-details/*"
  },
  {
    "renderMode": 0,
    "route": "/YallahDubaiTourism/admin/carddetails/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1247, hash: 'd0ac77c16e00730e9ac6d5d891bc683531f1ece661ed2972761850a2ba84906b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1565, hash: 'ab2e90a5073d8408624f7998ee07702d954023fae28dc17d82ffc1194853678d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-HPNLQLSF.css': {size: 17997, hash: 'pu6pG6Clk88', text: () => import('./assets-chunks/styles-HPNLQLSF_css.mjs').then(m => m.default)}
  },
};
