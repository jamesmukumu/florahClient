import { pool } from "../utils/pool"

export default eventHandler(async(event)=>{
try{
let {rows} = await pool.query(
"SELECT * FROM patners WHERE published = true"
)
return rows
}catch(err){
console.error(err)
return err
}


})