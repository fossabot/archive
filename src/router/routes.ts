import { RouteRecordRaw } from 'vue-router'

export enum ROUTE_NAMES {
  ROOT = 'main',
  ARCHIVE = 'archive',
  FILTER = 'filter',
  SEARCH = 'search',
  FEEDBACK = 'feedback',
  SUPPORT = 'support',
  AUTH = 'auth',
  CREATE = 'create',
  TUTORIAL = 'tutorial',
  PRIVACY = 'privacy',
  LOGIN = 'login',
}

const routes: RouteRecordRaw[] = [
  {
    name: ROUTE_NAMES.ROOT,
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.ARCHIVE,
        component: () => import('pages/ArchivePage.vue'),
      },
      {
        path: ROUTE_NAMES.FILTER,
        name: ROUTE_NAMES.FILTER,
        component: () => import('pages/ArchivePage.vue'),
      },
      {
        path: ROUTE_NAMES.SEARCH,
        name: ROUTE_NAMES.SEARCH,
        component: () => import('pages/ArchivePage.vue'),
      },
      {
        path: ROUTE_NAMES.FEEDBACK,
        name: ROUTE_NAMES.FEEDBACK,
        component: () => import('pages/FeedbackPage.vue'),
      },
      {
        path: ROUTE_NAMES.SUPPORT,
        name: ROUTE_NAMES.SUPPORT,
        component: () => import('pages/SupportPage.vue'),
      },
    ],
  },
  {
    path: '/archive',
    redirect: '/',
  },
  {
    path: '/auth',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.AUTH,
        component: () => import('pages/AuthPage.vue'),
      },
    ],
  },
  {
    path: '/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.CREATE,
        component: () => import('pages/CreatePage.vue'),
      },
    ],
  },
  {
    path: '/tutorial',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.TUTORIAL,
        component: () => import('pages/TutorialPage.vue'),
      },
    ],
  },
  {
    path: '/privacy',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.PRIVACY,
        component: () => import('pages/PrivacyPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.LOGIN,
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/UnknownPage.vue'),
  },
]

export default routes
