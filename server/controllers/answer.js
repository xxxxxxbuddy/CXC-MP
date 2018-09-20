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
  var result = '回答成功';
  //存储回答
  var answer_id = await DB('answer').returning('answer_id').insert({ user_type: data.user_type, user_id: data.user_id, answer_info: data.answer_info, answer_time: date, commentnum: 0, praisenum: 0 });
  //存储回答与项目/问题（0/1）关系
  var result3 = await DB('PQ_answer').insert({ answer_id: answer_id, object_type: data.object_type, object_id: data.object_id, time: date });
  //项目/问题回答数更新
  if(data.object_type==0){
    var num = await DB.select('answernum').from('project').where('project_id', data.object_id);
    var update = await DB('project').update({ answernum: num + 1 }).where('project_id', data.object_id);
  }
  else {
    var num = await DB.select('answernum').from('question').where('question_id', data.object_id);
    var update = await DB('question').update({ answernum: num + 1 }).where('question_id', data.object_id);
  }
  ctx.body = {
    code: 1,
    result: result
  }

}