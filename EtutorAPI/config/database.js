module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'ec2-3-209-234-80.compute-1.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'd7oqjrsqqjjpeb'),
      user: env('DATABASE_USERNAME', 'rinraiwhyuctwu'),
      password: env('DATABASE_PASSWORD', '97603359a89beaee7c12e239f625c15bd49f4a9d4efc08beeee2e3e5e9915bec'),
      ssl: {
        require: true,
        rejectUnauthorized: false
        },
    },
  },
});
