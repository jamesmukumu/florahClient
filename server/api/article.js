import { pool } from "../utils/pool";
export default eventHandler(async (event) => {
  try {
    let query = getQuery(event);
    let { rows } = await pool.query(
      `
  WITH selected_blog AS (
    SELECT
      a.*, 
      ad.name AS admin_name
    FROM articles a
    INNER JOIN admins ad
      ON a.admins_id = ad.id
    WHERE published = true
      AND a.slug = $1
    LIMIT 1
  )
  SELECT
    sb.*,
    (
      SELECT COALESCE(json_agg(related), '[]'::json)
      FROM (
        SELECT
          rb.*, 
          ad.name AS admin_name
        FROM articles rb
        INNER JOIN admins ad
          ON rb.admins_id = ad.id
        WHERE rb.published = true
          AND rb."articlesCategories_id" = sb."articlesCategories_id"
          AND rb.id != sb.id
        LIMIT 6
      ) related
    ) AS related_blogs
  FROM selected_blog sb;

`,
      [query.slug],
    );
    return rows[0];
  } catch (err) {
    console.error(err);
    return err;
  }
});
