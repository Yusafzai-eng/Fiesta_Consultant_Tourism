
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/YallahDubaiTourism/',
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
    'index.csr.html': {size: 1217, hash: 'd5f954abdf160e233697e91962637162404cfa252b355ab049fb29f582deb0a4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1535, hash: '8433fc7a7f25f93e38fb7dda5a2f5d3052a2a576c213510a63088a40e9367988', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-HPNLQLSF.css': {size: 17997, hash: 'pu6pG6Clk88', text: () => import('./assets-chunks/styles-HPNLQLSF_css.mjs').then(m => m.default)}
  },
};
