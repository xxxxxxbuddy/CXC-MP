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
  var answer = await DB.select('*').from('answer').where('answer_id', data.answer_id);
  var comment = await DB.select('*').from('comment').where('answer_id',data.answer_id);
  for (var i = 0; i < comment.length; i++) {
    if (comment[i].user_type == 0) {
      var information = await DB.select('individual_name').from('individual').where('individual_id', comment[i].user_id);
      comment[i].user_name = information[0].individual_name;
    }
    if (comment[i].user_type == 1) {
      var information = await DB.select('company_name').from('company').where('company_id', comment[i].user_id);
      comment[i].user_name = information[0].company_name;
    }
  }
  if (answer.user_type == 0) {
    var information = await DB.select('individual_name').from('individual').where('individual_id', comment[i].user_id);
    answer.user_name = information[0].individual_name;
  }
  if (answer.user_type == 1) {
    var information = await DB.select('company_name').from('company').where('company_id', comment[i].user_id);
    answer.user_name = information[0].company_name;
  }
  answer.comment=comment;
  ctx.body = {
    code: 1,
    result: answer        //返回发表的所有项目，最新的在前
  }
}