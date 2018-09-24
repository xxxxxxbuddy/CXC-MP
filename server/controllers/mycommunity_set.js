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
  var result = await DB.select('*').from('community').where({ user_id: data.user_id, user_type: data.user_type }).orderBy('community_time', 'desc');
  if (result.length > 0) {
    if (data.user_type == 0) {
      var individual = await DB.select('*').from('individual').where('individual_id', data.user_id);
        for (var i = 0; i < result.length; i++) {
        result[i].user_name = individual.individual_name;
        result[i].user_image = individual.image;
        }
      }
      else{
      var company = await DB.select('*').from('company').where('company_id', data.user_id);
        for (var i = 0; i < result.length; i++) {
        result[i].user_name = company.company_name;
        result[i].user_image = company.image;
        }
      }
  }
  ctx.body = {
    code: 1,
    result: result,        //返回我建立的圈子，最新的在前
  }
}