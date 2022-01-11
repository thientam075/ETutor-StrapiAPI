"use strict";

/**
 *  tin-quang-ba controller
 */

module.exports = {
  async rankTutor(ctx) {
    var res = await strapi.db.connection.raw(
      `SELECT U.id, U.fullname, U.email,U.avatar, T.profile, T.subjects, T.time, T.cost, temp.star, temp. total_rating
      FROM "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT, (SELECT DGTeacher.user_id as id, COUNT(DG) as total_rating, AVG(DG.star) as star
                                                FROM danh_gias as DG, danh_gias_id_teacher_links as DGTeacher
                                                WHERE DG.id = DGTeacher.danh_gia_id
                                                GROUP BY DGTeacher.user_id) as temp
      WHERE temp.id = U.id AND T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id AND temp.star >= 4
    ORDER BY temp.star DESC
    LIMIT 10`
    );
    return res;
  },
  async searchTeacher(ctx) {
    const queryObj = ctx.request.query.name;
    let query = "";
    if (!queryObj || queryObj === "") {
      query = `SELECT U.id, U.fullname, U.email,U.avatar, T.profile, T.subjects, T.time, T.cost, temp.star, temp. total_rating
      FROM "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT, (SELECT DGTeacher.user_id as id, COUNT(DG) as total_rating, AVG(DG.star) as star
                                                FROM danh_gias as DG, danh_gias_id_teacher_links as DGTeacher
                                                WHERE DG.id = DGTeacher.danh_gia_id
                                                GROUP BY DGTeacher.user_id) as temp
      WHERE temp.id = U.id AND T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id
      ORDER BY U.fullname ASC`;
    } else {
      query = `SELECT U.id, U.fullname, U.email,U.avatar, T.profile, T.subjects, T.time, T.cost, temp.star, temp. total_rating
      FROM "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT, (SELECT DGTeacher.user_id as id, COUNT(DG) as total_rating, AVG(DG.star) as star
                                                FROM danh_gias as DG, danh_gias_id_teacher_links as DGTeacher
                                                WHERE DG.id = DGTeacher.danh_gia_id
                                                GROUP BY DGTeacher.user_id) as temp
      WHERE temp.id = U.id AND T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id AND U.document_vectors @@ to_tsquery('${queryObj}')
       
  ORDER BY temp.star DESC`;
    }
    var res = await strapi.db.connection.raw(query);
    return res;
  },
  async fullInfoTeacher(ctx) {
   
    const queryObj = ctx.request.params.id;
    if (queryObj === null || queryObj === undefined) {
      
      return ctx.badRequest("id is not exist");
    }
    let query = `SELECT U.id, U.fullname, U.email,U.avatar, T.profile, T.subjects, T.time, T.cost, temp.star, temp. total_rating
    FROM "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT, (SELECT DGTeacher.user_id as id, COUNT(DG) as total_rating, AVG(DG.star) as star
                                              FROM danh_gias as DG, danh_gias_id_teacher_links as DGTeacher
                                              WHERE DG.id = DGTeacher.danh_gia_id
                                              GROUP BY DGTeacher.user_id) as temp
    WHERE temp.id = U.id AND T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id AND U.id = ${queryObj}
    ORDER BY U.fullname ASC`;
    var res = await strapi.db.connection.raw(query);
    
    return res;
  },
  async findAllTutor(ctx) {
    let query = `SELECT
    U.id, U.fullname, U.email, T.profile, T.subjects, T.time, T.cost
FROM
    "tin_quang_bas" as T, "up_users" as U, "tin_quang_bas_id_teacher_links" as UT
WHERE
    T.id = UT."tin_quang_ba_id" AND UT."user_id" = U.id `;
    var res = await strapi.db.connection.raw(query);
    return res;
  },

  async updateIndex(ctx) {
    let query = `
    UPDATE 
    up_users 
SET 
    document_vectors = (to_tsvector(fullname)) `;
    var res = await strapi.db.connection.raw(query);
    return res;
  },
  async getAdByTeacherId(ctx) {
    console.log(1111111)
    const queryObj = ctx.request.params.id;
    if (queryObj === null || queryObj === undefined) {
      console.log(222222222)
      return ctx.badRequest("id is not exist");
    }
    console.log('queryObj',queryObj)
    let query = `SELECT
            UT.tin_quang_ba_id
        FROM
             "tin_quang_bas_id_teacher_links" as UT
        WHERE
             UT.user_id = ${queryObj}`;
    var res = await strapi.db.connection.raw(query);
    console.log('res', res)
    return res;
  },

};
