/**
 * custom currency routes
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/currency-rates',
      handler: 'currency.rates',
      config: {
        auth: false,
      },
    },
  ],
};
