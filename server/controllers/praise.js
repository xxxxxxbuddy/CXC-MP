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
  var result = '点赞成功';
  //存储点赞（点赞用户-点赞对象、0为点赞回答；1为点赞评论）
  var result1 = await DB('praise').insert({ user_type: data.user_type, user_id: data.user_id, object_type: data.object_type, object_id: data.object_id, praise_time: date });
  //项目/问题回答数更新
  if (data.object_type == 0) {
    var num = await DB.select('praisenum').from('answer').where('answer_id', data.object_id);
    var update = await DB('answer').update({ praisenum: num + 1 }).where('answer_id', data.object_id);
  }
  else {
    var num = await DB.select('praisenum').from('comment').where('comment_id', data.object_id);
    var update = await DB('comment').update({ praisenum: num + 1 }).where('comment_id', data.object_id);
  }
  ctx.body = {
    code: 1,
    result: result
  }

}