import { defineConfig } from 'umi';

export default defineConfig({
  // proxy: {
  //   'employee/': {
  //     target: 'http://zhangyixiao.club:8080',
  //     pathRewrite: { '^/employee': '' },
  //     changeOrigin: true,
  //   },
  // },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/article/:id', component: '@/pages/articleDetail/index' },
  ],
  fastRefresh: {},
});
