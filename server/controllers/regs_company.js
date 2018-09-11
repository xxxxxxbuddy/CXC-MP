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
  var x = await DB('company').insert({ company_id: data.company_id, company_name: data.company_name, company_type: data.company_type, company_address: data.company_address, company_introduce: data.company_introduce, company_state: '未认证',company_time: date });
  var result='注册成功';

  //例如 
 //var result1 = await DB('company').insert({ company_id: 15827348758, company_name: '红星公司',company_type: '制造机械厂', company_address: '华中科技大学后面', company_state: '未认证',company_introduce: '这个公司很懒什么都没写', company_time:date});
 

  ctx.body = {
    result: result
  }

}