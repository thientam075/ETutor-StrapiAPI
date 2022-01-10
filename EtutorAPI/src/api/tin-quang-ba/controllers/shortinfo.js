"use strict";

/**
 *  tin-quang-ba controller
 */

module.exports = {
  async rankTutor(ctx) {
    var res = await strapi.db.connection.raw(
      `SELECT
        U.id,U.fullname, T.star, T.total_rating
    FROM
        "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT
    WHERE
        T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id AND T.star >= 4
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
            "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT
        WHERE
            T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id
        ORDER BY U.fullname ASC`;
    } else {
      query = `SELECT
      U.fullname, T.star, T.total_rating
  FROM
      "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT
  WHERE
      T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id AND U.document_vectors @@ to_tsquery('${queryObj}')
  ORDER BY T.star DESC`;
    }
    var res = await strapi.db.connection.raw(query);
    return res;
  },
  async fullInfoTeacher(ctx) {
    const queryObj = ctx.request.params.id;
    if (queryObj === null || queryObj === undefined) {
      return ctx.badRequest("id is not exist");
    }
    let query = `SELECT
            U.id, U.fullname, U.email, T.profile, T.subjects, T.time, T.cost, T.star, T.total_rating
        FROM
            "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT
        WHERE
            T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id AND U.id = ${queryObj}
        ORDER BY U.fullname ASC`;
    var res = await strapi.db.connection.raw(query);
    return res;
  },
  async findAllTutor(ctx) {
    let query = `SELECT
    U.id, U.fullname, U.email, T.profile, T.subjects, T.time, T.cost, T.star, T.total_rating
FROM
    "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT
WHERE
    T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id `;
    var res = await strapi.db.connection.raw(query);
    return res;
  },
  async updateIndex(ctx) {
    let query = `CREATE INDEX idx_name_doc_vec ON up_users USING gin(document_vectors);
    UPDATE 
    up_users 
SET 
    document_vectors = (to_tsvector(fullname); `;
    var res = await strapi.db.connection.raw(query);
    return res;
  },
};
