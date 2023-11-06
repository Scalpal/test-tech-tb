const routes = {
  home: () => '/',
  login: () => '/login',
  cart: () => '/cart',
  payment: () => '/payment',
  api: {
    baseUrl: () => 'http://localhost:3001',
    products: {
      all: () => '/api/products',
    },
    order: () => '/api/order',
  },
};

export default routes;
