
module.exports = {
  tz:"+0400",
  port: 9030,
  recordspath:"/var/records",
  db: {
    client = mysql,
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "cdr",
      charset:"utf8"
    },
    pool: {
      min: 0,
      max: 10
    }
  },
  cdr: {
    table: "cdr"
  }
};