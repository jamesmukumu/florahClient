import {pool} from "../utils/pool"

export default eventHandler(async(event)=>{
try{
let {rows:categories} = await pool.query(
`
SELECT title,id FROM "articlesCategories"

`
) 
const { rows: articles } = await pool.query(`
  SELECT
    a.id,
    a.title,
    a.slug,
    a."articleImage",
    a."articleOverview",
    a.created_at,
    a.admins_id,
    ad.name AS admin_name
  FROM articles AS a
  INNER JOIN admins AS ad
    ON a.admins_id = ad.id
  WHERE a.published = TRUE
  ORDER BY a.created_at DESC LIMIT 5;
`);

return {
categories:categories,
articles:articles
}
}catch(err){
console.error(err)
return err
}

})