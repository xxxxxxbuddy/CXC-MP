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
  var date = new Date();
  var user_type = 0;
  var result='发布成功';
  var x = await DB.select('company_id').from('user').where(company_id, data.user_id);
  if (x > 0) {
    user_type = 1;
  }
  var x = await DB('question').insert({user_type:user_type, user_id:data.user_id, question_title:data.question_title, question_info:data.question_info, question_time:date, answernum:0, power:1, hot:100});

  
  //例如
  //var x = await DB('question').insert({ user_type: 0, user_id: 18211949726, question_title: '公司如何解决员工问题', question_info: '我们公司是一个小公司.....', question_time: date, answernum: 0, power: 1, hot: 100 });
  
  ctx.body = {
    code: 1,
    result:result
  }
}