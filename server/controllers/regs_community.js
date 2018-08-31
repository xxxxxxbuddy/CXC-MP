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
  var user_type = 0;
  var result='建圈成功';
  var x = await mysql.select('company_id').from('user').where(company_id,data.user_id) ;
  if(x>0)
  {
    user_type=1;
  }
  var result2 = await DB('community').insert({ user_type: user_type, user_id:data.user_id, community_name: data.community_name, community_type: data.community_type, community_introduce: data.community_introduce, community_time: date, questionnum: 0, projectnum: 0, usernum: 1 })

 //例如
 // var result2 = await DB('community').insert({ user_type: 0, user_id: 18211949726,community_name:'文艺圈',community_type:'文学',community_introduce:'无',community_time:date,questionnum:0,projectnum:0,usernum:1 });
 
  var result2 = await DB.select('*').from('company');
  ctx.body = {
    result:result
  }
}