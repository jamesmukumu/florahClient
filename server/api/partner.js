import {pool} from '../utils/pool'
export default eventHandler(async(event)=>{
try{
let query = getQuery(event)
let {rows} = await pool.query(
"SELECT * FROM patners where published = true AND slug = $1",
[query.slug]
)
return rows
}catch(err){
console.error(err)
return err
}

})