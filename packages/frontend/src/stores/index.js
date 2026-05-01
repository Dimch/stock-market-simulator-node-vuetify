// Utilities
import {createPinia} from 'pinia';
import router from '@/router';

export const createAppPinia = (appRouter = router) => {
  const pinia = createPinia();

  pinia.use(({store}) => {
    store.router = appRouter;
  });

  return pinia;
};

const pinia = createAppPinia();

export default pinia;
