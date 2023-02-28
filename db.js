const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    password: "ZGSnRaF09",
    host: "localhost",
    port: 5432,
    database: "concertSite"
})




module.exports = pool

