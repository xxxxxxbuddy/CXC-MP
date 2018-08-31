//
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
  var date=new Date();
  var user_type=0;
  var result='发布成功';
  var x = await DB.select('company_id').from('user').where(company_id,data.user_id) ;
  if(x>0)
  {
    user_type=1;
  }
  var result2 = await DB('project').insert({user_type:user_type,user_id:data.user_id,project_title:data.project_title, project_type:data.project_type, project_period:data.project_period, project_budget:data.project_budget, project_time:date, project_require:data.project_require, answernum:0, power:data.power,hot:100});
 
/* 
  var result2 = await DB('project').insert({ user_type: 1, user_id:18211949726, project_title: '商城开发', project_type: '微信小程序开发', project_period: '两个月', project_budget: 1000, project_time: project_time, project_require: '能快速开发，有经验', answernum: 0, power: 1, hot: 100 });

*/
  ctx.body = {
    code:1,
    result:result
  }
}