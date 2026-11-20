import {pool} from '../utils/pool'

export default eventHandler(async(event)=>{
try{
let {rows} = await pool.query(
`
  SELECT title, slug, "practiceAreaImage", overview,description
  FROM "practiceAreas"
  WHERE published = true
`
)

let {rows:blogs} = await pool.query(
`
SELECT title, slug,created_at FROM articles WHERE published = true LIMIT 4

`
)
return {
practices:rows,
articles:blogs
}
}catch(err){
console.error('Failed to load home page data:', err)
throw createError({ statusCode: 503, statusMessage: 'Home page data is unavailable' })
}
})