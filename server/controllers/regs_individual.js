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
  var data =ctx.query;
  var date=new Date();
  var x = await DB('individual').insert({ individual_id: data.individual_id, individual_name: data.individual_name, individual_sex:data.individual_sex, individual_job: data.individual_job, individual_corporation: data.individual_corporation, individual_state: 0, individual_introduce: data.individual_introduce, individual_time: date, answer_num: 0, question_num: 0, project_num: 0, setcommunity_num: 0, joincommunity_num, fans_num: 0, idol_num: 0 });
  var result='注册成功';

//例如
//var result1 = await DB('individual').insert({ individual_id: 18211949725, individual_name: '伊泽瑞尔', individual_job: '无', individual_corporation: '华中科技大学', individual_state: '未认证', individual_introduce: '这个人很懒什么都没写', individual_time:date});
 ctx.body = {
    result:result, //返回注册成功
   }
}