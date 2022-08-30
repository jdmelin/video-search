import { Router } from '@vaadin/router';
import './app';
import './components/search/search';

const routes = [
  {
    path: '/',
    component: 'app-home',
  },
  {
    path: 'search',
    component: 'search-container',
  },
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
