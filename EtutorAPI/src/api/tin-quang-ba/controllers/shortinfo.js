"use strict";

/**
 *  tin-quang-ba controller
 */

module.exports = {
  async rankTutor(ctx) {
    var res = await strapi.db.connection.raw(
      `SELECT
        U.fullname, T.star, T.total_rating
    FROM
        "tin_quang_bas" as T, "nguoi_dungs" as U, "tin_quang_bas_id_teacher_links" as UT
    WHERE
        T.id = UT."tin_quang_ba_id" AND UT."nguoi_dung_id" = U.id AND T.star >= 4
    ORDER BY T.star DESC
    LIMIT 10`
    );
    return res;
  },
  async searchTeacher(ctx) {
    const queryObj = ctx.request.query.name;
    let query = "";
    if (!queryObj || queryObj === "") {
      query = `SELECT
            U.fullname, T.star, T.total_rating
        FROM
            "tin_quang_bas" as T, "nguoi_dungs" as U, "tin_quang_bas_id_teacher_links" as UT
        WHERE
            T.id = UT."tin_quang_ba_id" AND UT."nguoi_dung_id" = U.id
        ORDER BY U.fullname ASC`;
    } else {
      query = `SELECT
      U.fullname, T.star, T.total_rating
  FROM
      "tin_quang_bas" as T, "nguoi_dungs" as U, "tin_quang_bas_id_teacher_links" as UT
  WHERE
      T.id = UT."tin_quang_ba_id" AND UT."nguoi_dung_id" = U.id AND U.document_vectors @@ to_tsquery(${queryObj})
  ORDER BY T.star DESC`;
    }
    var res = await strapi.db.connection.raw(query);
    return res;
  },
  async fullInfoTeacher(ctx) {
    const queryObj = ctx.request.params;
    let query = `SELECT
            *
        FROM
            "tin_quang_bas" as T, "nguoi_dungs" as U, "tin_quang_bas_id_teacher_links" as UT
        WHERE
            T.id = UT."tin_quang_ba_id" AND UT."nguoi_dung_id" = U.id AND U.id = ${queryObj}
        ORDER BY U.fullname ASC`;
    var res = await strapi.db.connection.raw(query);
    return res;
  },
};
