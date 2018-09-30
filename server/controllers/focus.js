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
  //存储关注关系
  var result = await DB('user_user').insert({ fans_type: data.fans_type, fans_id: data.fans_id, idol_type: data.idol_type, idol_id: data.idol_id, time:date });
  //粉丝关注数更新
  if (data.fans_type == 0) {
    var update1 = await DB('individual').where('individual_id', data.fans_id).increment('idol_num', 1);
  }
  else {
    var update1 = await DB('company').where('company_id', data.fans_id).increment('idol_num', 1);
  }
  //偶像被关注数更新
  if (data.idol_type == 0) {
    var update2 = await DB('individual').where('individual_id', data.idol_id).increment('fans_num', 1);
  }
  else {
    var update2 = await DB('company').where('company_id', data.idol_id).increment('fans_num', 1);
  }

  ctx.body = {
    code: 1,
    result: result,
    update1:update1,
    update2: update2
  }

}