import{pool} from "../utils/pool"
export default eventHandler(async(event)=>{
try{
let query = getQuery(event)
let {rows} = await pool.query(
`
  WITH selected_blog AS (
    SELECT *
    FROM articles
    WHERE published = true
      AND slug = $1
    LIMIT 1
  )
  SELECT
    sb.*,
    (
      SELECT COALESCE(json_agg(rb), '[]'::json)
      FROM (
        SELECT *
        FROM articles
        WHERE published = true
          AND "articlesCategories_id" = sb."articlesCategories_id"
          AND id != sb.id
        LIMIT 6
      ) rb
    ) AS related_blogs
  FROM selected_blog sb;

`,
[query.slug]
)
return rows[0]
}catch(err){
console.error(err)
return err
}
})