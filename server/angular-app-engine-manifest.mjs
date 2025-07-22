
export default {
  basePath: 'https://yusafzai-eng.github.io/YallahDubaiTourism',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
