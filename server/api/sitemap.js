import {pool} from '../utils/pool'

export default eventHandler(async(event)=>{
let [{rows:articles},{rows:partners}] = await Promise.all([
pool.query(
`
SELECT slug,"articleImage",created_at,updated_at FROM articles

`
),
pool.query(
`SELECT slug,created_at,updated_at,'patnersImage' FROM patners;
`
)
])

let articlesMap = articles.map((article)=>({
loc:`/legal-article/${article.slug}`,
lastMod:article.updated_at,
changefreq:"weekly",
priority:0.9,
images:[
{
loc:`https://api.floracadvocates.co.ke/storage/${article.articleImage}`,
caption:article.slug,
title:article.slug
}
]
}))


let patnersMap = partners.map((partner)=>({
loc:`/partner/${partner.slug}`,
lastMod:partner.updated_at,
changefreq:"weekly",
priority:0.9,
images:[
{
loc:`https://api.floracadvocates.co.ke/storage/${partner.partnersImage}`,
caption:partner.slug,
title:partner.slug
}
]
}))


return [...articlesMap,...patnersMap]
})