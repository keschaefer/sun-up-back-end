module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/sunup'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
