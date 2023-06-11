import type { AllMessageSchemaKeys } from '@/plugins/i18n/locales';
import type { Component } from 'vue';

export interface Divider {
  type: 'divider';
}

export interface SimpleRoute {
  type: 'simple';
  route: string;
  component: Component;
}

export interface NavigationRoute extends Omit<SimpleRoute, 'type'> {
  type: 'nav';
  translateKey: AllMessageSchemaKeys;
  icon: string;
}
export type ViewableRoute = SimpleRoute | NavigationRoute;
export type RouteListItem = ViewableRoute | Divider;
export type RouteList = RouteListItem[];
