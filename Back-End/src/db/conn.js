const { Pool } = require('pg')
const connectionString = 'postgres://xyvhiphektyhur:02c69dcbaab9fe0d7cb4c0a2d2415a7b1b2991447368615e0684935595abbce6@ec2-52-7-30-112.compute-1.amazonaws.com:5432/d82q7217h79537'

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
})

module.exports = pool;
