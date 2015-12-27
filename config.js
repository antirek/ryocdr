
module.exports = {
  tz:"+0400",
  port: 9030,
  recordspath:"/var/records",
  db: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "1234",
      database: "cdr",
      charset:"utf8"
    }
  },
  cdr: {
    table: "cdr"
  },
  auth: true,
  username: 'admin',
  password: 'password'
};