// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
// import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'en-US',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/shopping-list',
          name: 'default',
          component: './ShoppingList.jsx'
        },
        {
          path: '/copilot',
          //redirect: '/dashboard/analysis',
          name: 'default',
          component: './Welcome.jsx'
        },
        {

          path: '/meal-planner',
          //redirect: '/dashboard/analysis',
          name: 'default',
          component: './meal_planner/index.js'
        },
        {
          path: '/dynamic/:recipe_id',
          //redirect: '/dashboard/analysis',
          name: 'default',
          component: './Welcome.jsx'
        },
        {
          path: '/recipe-list',
          name: 'default',
          component: './RecipeList.jsx'
        },
        {
          path: '/recipe/:recipe_id',
          name: 'default',
          component: './Recipe.jsx'
        },
        {
          path: '/search-page',
          name: 'default',
          component: './search_page/SearchPage.jsx'
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
