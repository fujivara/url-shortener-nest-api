export default () => ({
  security: {
    secret: process.env.JWT_SECRET ?? 'DiesIrae',
  },
  rateLimit: {
    ttl: 1440000,
    limit: 4,
  },
});
