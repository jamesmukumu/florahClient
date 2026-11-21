import { pool } from "../utils/pool";

export default eventHandler(async () => {
  try {
    await pool.query("SELECT 1");
    return { status: "ok" };
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: "Service unavailable",
    });
  }
});
