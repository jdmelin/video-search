import { Router } from '@vaadin/router';
import './app';
import './search/search';

const routes = [
  {
    path: '/',
    component: 'lit-app',
  },
  {
    path: 'search',
    component: 'lit-search',
  },
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
