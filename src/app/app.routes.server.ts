import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Root route
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  
  // Main routes
  {
    path: 'products/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'city',
    renderMode: RenderMode.Server,
  },
  {
    path: 'card',
    renderMode: RenderMode.Server,
  },
  {
    path: 'login',
    renderMode: RenderMode.Server,
  },
  {
    path: 'invalid',
    renderMode: RenderMode.Server,
  },
  {
    path: 'sinup',
    renderMode: RenderMode.Server,
  },
  {
    path: 'main',
    renderMode: RenderMode.Server,
  },
  {
    path: 'citytour',
    renderMode: RenderMode.Server,
  },
  {
    path: 'aboutus',
    renderMode: RenderMode.Server,
  },
  {
    path: 'corporate',
    renderMode: RenderMode.Server,
  },
  {
    path: 'local',
    renderMode: RenderMode.Server,
  },
  {
    path: 'Product_details',
    renderMode: RenderMode.Server,
  },
  {
    path: 'producttable',
    renderMode: RenderMode.Server,
  },

  // Admin parent route
  {
    path: 'admin',
    renderMode: RenderMode.Server,
  },
  
  // Admin child routes
  {
    path: 'admin/Users',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/Orders',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/Add-Products',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/products',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/edit/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/user-details/:userId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/user-Order-details/:userId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/carddetails/:userId',
    renderMode: RenderMode.Server,
  }
];
