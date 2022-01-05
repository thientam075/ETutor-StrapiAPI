module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a5cdfe19f50995b639826eb45ffbb513'),
  },
});
