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
  var data=ctx.query;
  var result=[];
  var obj = await DB.select('object_type','object_id').from('PQ_community').orderBy('time','desc').where('community_id',data.community_id);
  for(var i=0;i<obj.length;i++)
    {
      if (obj[i].object_type == 0) {
        var information = await DB.select('*').from('project').where('project_id', obj[i].object_id);
        result[i]= information[0];
      }
     if (obj[i].object_type == 1) {
       var information = await DB.select('*').from('question').where('question_id', obj[i].object_id);
        result[i] = information[0];
     }
    }
  for (var i = 0; i < result.length; i++) {
    if (result[i].user_type == 0) {
      var information = await DB.select('individual_name').from('individual').where('individual_id', result[i].user_id);
      result[i].user_name = information[0].individual_name;
    }
    if (result[i].user_type == 1) {
      var information = await DB.select('company_name').from('company').where('company_id', result[i].user_id);
      result[i].user_info = information[0].company_name;
    }
  }
  ctx.body = {
    code: 1,
    result:result      //返回id所在圈子的问题、项目（按时间倒序）
  }
}