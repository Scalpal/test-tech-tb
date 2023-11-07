const routes = {
  home: () => '/',
  register: () => '/register',
  login: () => '/login',
  cart: () => '/cart',
  payment: () => '/payment',
  paymentConfirmation: () => '/payment/confirmation',
  api: {
    baseUrl: () => 'http://localhost:3001',
    users: {
      register: () => '/api/register',
      login: () => '/api/login',
    },
    products: {
      all: (searchValue: string) => `/api/products?search=${searchValue}`,
    },
    order: () => '/api/order',
  },
};

export default routes;
