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
  var result={};
  if(data.user_type==0){
    var individual = await DB.select('*').from('individual').where('individual_id', data.user_id );
    result=individual;
  }
  else{
    var company = await DB.select('*').from('company').where('company_id', data.user_id);
    result = company;
  }
  ctx.body = {
    code: 1,
    result: result,        //返回我的所有信息
  }
}