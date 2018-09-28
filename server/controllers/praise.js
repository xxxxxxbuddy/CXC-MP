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
  var result = await DB('praise').insert({ user_type: data.user_type, user_id: data.user_id, object_type: data.object_type, object_id: data.object_id, praise_time: date });
  //项目/问题回答数更新
  if (data.object_type == 0) {
    var update = await DB('answer').where('answer_id', data.object_id).increment('praisenum', 1);
  }
  else {
    var update = await DB('comment').where('comment_id', data.object_id).increment('praisenum', 1);
  }
  ctx.body = {
    code: 1,
    result: result
  }

}