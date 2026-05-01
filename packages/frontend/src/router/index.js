// Composables
import {createRouter, createWebHistory} from 'vue-router';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';
import CustomerRoutes from './CustomerRoutes';
import {useAuthStore} from '@/stores/auth';
import {useCsrfStore} from '@/stores/csrf';
import {useUIStore} from '@/stores/ui';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  PublicRoutes,
  AdminRoutes,
  CustomerRoutes,
];

export const createAppRouter = (history = createWebHistory(import.meta.env.BASE_URL)) => {
  const router = createRouter({
    history,
    routes,
  });

  // Authentication guard
  router.beforeEach(async (to) => {
    const publicPages = ['/'];

    const isPublicPage = publicPages.includes(to.path);
    const authRequired = !isPublicPage && to.matched.some((record) => record.meta?.requiresAuth);
    const auth = useAuthStore(to.meta?.authStrategy || 'admin');
    const isAuthenticated = await auth.isAuthenticated();
    // console.debug('Navigating to:', to.fullPath, 'Auth required:', authRequired, 'is authenticated:', isAuthenticated);

    if (authRequired && !isAuthenticated) {
      // redirect to login
      auth.$patch({returnUrl: to.fullPath});
      return to.meta?.loginRoute || auth.loginRoute;
    }
    if (isAuthenticated && to.fullPath === auth.loginRoute) { // Redirect logged in user away from login page
      return auth.returnUrl && auth.returnUrl !== to.fullPath
        ? auth.returnUrl
        : auth.redirectRoute;
    }
    return true;
  });

  // CSRF token guard
  // Ensures CSRF token is fetched when SPA is loaded or page is refreshed
  router.beforeEach(async () => {
    const csrfStore = useCsrfStore();
    if (!csrfStore.token) {
      await csrfStore.fetchToken();
    }
  });

  // Loading indicator
  router.beforeEach(() => {
    const uiStore = useUIStore();
    uiStore.isLoading = true;
  });

  router.afterEach(() => {
    const uiStore = useUIStore();
    uiStore.isLoading = false;
  });

  // Workaround for https://github.com/vitejs/vite/issues/11804
  router.onError((err, to) => {
    if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
      if (localStorage.getItem('vuetify:dynamic-reload')) {
        console.error('Dynamic import error, reloading page did not fix it', err);
      } else {
        console.log('Reloading page to fix dynamic import error');
        localStorage.setItem('vuetify:dynamic-reload', 'true');
        location.assign(to.fullPath);
      }
    } else {
      console.error(err);
    }
  });

  router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload');
  });

  return router;
};

const router = createAppRouter();

export default router;
