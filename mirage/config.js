export default function () {
  this.namespace = '/api';

  this.get('/products', function () {
    return {
      data: [
        {
          type: 'product',
          id: '1',
          attributes: {
            name: 'Product 1',
            price: 100,
            code: 'GR1',
          },
        },
        {
          type: 'product',
          id: '2',
          attributes: {
            name: 'Product 2',
            price: 200,
            code: 'SR1',
          },
        },
      ],
    };
  });
}
