import { ref, computed } from 'vue';
import { useIcons } from './icons';
import { usePeople } from './people';
import type { RouteList, SimpleRoute, ViewableRoute } from '@/_types/routes';
import { View404, ViewHousing, ViewIndex, ViewMaps, ViewMarion, ViewRyan } from '@/views';

export const useCustomRouting = () => {
  const people = usePeople();

  const routes: RouteList = [
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
    { type: 'simple', route: people.ryan.value.href.slice(1), component: ViewRyan },
    { type: 'simple', route: people.marion.value.href.slice(1), component: ViewMarion },
    { type: 'divider' },
  ];

  const currentPath = ref(window.location.hash);

  const currentView = computed(() => {
    const currentRoute = currentPath.value.slice(1) || '/';
    const routeIndex = routes.findIndex((value) => {
      if (value.type === 'divider') return false;
      return value.route === currentRoute;
    });
    if (routeIndex < 0) {
      const notFound: Pick<SimpleRoute, 'component'> = { component: View404 };
      return notFound;
    }
    return routes[routeIndex] as ViewableRoute;
  });
  return { currentView, currentPath, routes };
};
