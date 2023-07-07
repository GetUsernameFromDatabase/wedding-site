import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { useIcons } from '@/composables/icons';
import type { RouteList, SimpleRoute } from '@/_types/routes';
import { View404, ViewHousing, ViewIndex, ViewMaps, ViewMarion, ViewRyan } from '@/views';
import { basePath } from '@/config';
import { weddingCoupleRoutePaths } from '@/composables/people';

export const routesForNav: RouteList = [
  {
    type: 'nav',
    route: '/',
    component: ViewIndex,
    icon: useIcons.home.vuetify,
    translateKey: 'navigation.home',
  },
  {
    type: 'nav',
    route: '/maps',
    component: ViewMaps,
    icon: useIcons.maps.vuetify,
    translateKey: 'navigation.maps',
  },
  {
    type: 'nav',
    route: '/housing',
    component: ViewHousing,
    icon: useIcons.housing.vuetify,
    translateKey: 'navigation.housing',
  },
  { type: 'simple', route: weddingCoupleRoutePaths.ryan, component: ViewRyan },
  { type: 'simple', route: weddingCoupleRoutePaths.marion, component: ViewMarion },
  { type: 'divider' },
];

const customRoutes = routesForNav.filter((route) => route.type !== 'divider') as SimpleRoute[];
const routes: RouteRecordRaw[] = customRoutes.map((route) => ({
  path: route.route,
  component: route.component,
}));
routes.push({ path: '/:pathMatch(.*)*', name: 'NotFound', component: View404 });

const router = createRouter({ history: createWebHashHistory(basePath), routes });
export default router;
