import { pool } from "../utils/pool"

export default eventHandler(async()=>{
try{
let {rows} = await pool.query(
"SELECT * FROM patners WHERE published = true ORDER BY created_at ASC"
)
return rows
}catch(err){
console.error(err)
return err
}


})
