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
  var x = await DB.select('company_id').from('company').where('company_id', data.user_id);    //获取建圈的人的类型
  if(x.length==0)
  {
    user_type=1;
  }
  var y = await DB.select('community_name').from('community').where('community_name', data.community_name);
  if(y==0){
    //如果圈名不重复，则将圈子信息插入
    var result_regs_community = await DB('community').insert({ user_type: user_type, user_id: data.user_id, community_name: data.community_name, community_type: data.community_type, community_introduce: data.community_introduce, community_time: date, questionnum: 0, projectnum: 0, usernum: 1 })
    //获取自增圈子的id
    var community_id = await DB.select('community_id').where('community_name', data.community_name).from('community');
    //获取建立圈子的时间
    var community_time = await DB.select('community_time').where('community_id', community_id).from('community');
    //将信息存储在圈子-用户的关系表中
    var result_community_user = await DB('community_user').insert({ community_id: community_id, user_type: user_type, user_id: data.user_id, time: community_time });
  }
  else{
    //如果圈名重复，则重新输入
    result='圈子名称重复';
  }
 //例如
 //var result2 = await DB('community').insert({ user_type: 0, user_id: 18211949725,community_name:'无聊诗社',community_type:'文学类',community_introduce:'无',community_time:date,questionnum:0,projectnum:0,usernum:1 });

  ctx.body = {
    result:result,
  }
}