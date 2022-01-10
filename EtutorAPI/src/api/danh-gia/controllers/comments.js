"use strict";

/**
 *  tin-quang-ba controller
 */

module.exports = {
  async listComments(ctx) {
    const queryObj = ctx.request.params.id;
    var res = await strapi.db.connection.raw(
      `SELECT
      users.id,users.fullname,users.avatar, dg.star, dg.comment
  FROM
      "danh_gias" as dg, "danh_gias_id_student_links" as dguser, "danh_gias_id_teacher_links" as dgteacher, up_users as users
  WHERE
      dg.id = dguser.danh_gia_id AND dg.id = dgteacher.danh_gia_id AND dguser.user_id = users.id AND dgteacher.user_id = ${queryObj}
  ORDER BY dg.star DESC`
    );
    return res;
  },
};
