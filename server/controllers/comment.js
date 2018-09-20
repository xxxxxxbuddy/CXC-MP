const { mysql: config } = require('../config')
const DB = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  }
})

module.exports = async (ctx, next) => {
  var data = ctx.query;
  var date = new Date();
  var result = '回复成功';
  //存储评论
  var comment_id = await DB('comment').returning('comment_id').insert({ user_type: data.user_type, user_id: data.user_id, comment_info: data.comment_info, comment_time: date, praisenum: 0, answer_id:data.answer_id});
  //更新被评论的回答的评论数
  var num = await DB.select('commentnum').from('answer').where('answer_id', data.answer_id);
  var update = await DB('answer').update({ answernum: num + 1 }).where('answer_id', data.answer_id);
  ctx.body = {
    code: 1,
    result: result
  }

}