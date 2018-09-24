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
  var result = await DB.select('*').from('project').where({ user_id: data.user_id, user_type: data.user_type }).orderBy('project_time','desc');
  ctx.body = {
    code: 1,
    result: result,        //返回发表的所有项目，最新的在前
  }
}