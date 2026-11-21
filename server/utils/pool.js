import {Pool} from 'pg'
let config = useRuntimeConfig()
export const pool = new Pool({
host:config.db.host || process.env.DB_HOST,
port:config.db.port || process.env.DB_PORT,
user:config.db.user || process.env.DB_USER,
password:config.db.password || process.env.DB_PASSWORD,
database:config.db.db_name || process.env.DB_NAME,
ssl:{
rejectUnauthorized:false
}

})
