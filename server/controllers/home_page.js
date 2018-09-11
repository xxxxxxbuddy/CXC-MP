<<<<<<< HEAD
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
  var date=new Date();
  var result1 = await DB.select('project_id', 'user_type', 'user_id', 'project_title', 'project_type', 'project_finish', 'project_budget', 'project_time', 'project_require', 'answernum', 'power', 'hot').from('project').orderBy('hot', 'desc').havingRaw('project_time > ?', date.getTime() - 2*24 * 60 * 60 * 1000).where('power',0);
  var result2 = await DB.select('question_id', 'user_type', 'user_id', 'question_title', 'question_info', 'question_time', 'answernum', 'power', 'hot').from('question').orderBy('hot', 'desc').havingRaw('question_time > ?', date.getTime() - 2*24 * 60 * 60 * 1000).where('power',0);
  
  var length1 = result1.length;
  var length2 = result1.length;
  for (var i = 0; i < length1; i++) {
    if (result1[i].user_type == 0) {
      var information = await DB.select('*').from('individual').where('individual_id', result1[i].user_id);
      result1[i].user_info = information;
    }
    if (result1[i].user_type == 1) {
      var information = await DB.select('*').from('company').where('company_id', result1[i].user_id);
      result1[i].user_info = information;
    }
  }

  for (var i = 0; i < length2; i++) {
    if (result2[i].user_type == 0) {
      var information = await DB.select('*').from('individual').where('individual_id', result2[i].user_id);
      result2[i].user_info = information;
    }
    if (result2[i].user_type == 1) {
      var information = await DB.select('*').from('company').where('company_id', result2[i].user_id);
      result2[i].user_info = information;
    }
  }

  ctx.body = {
    code: 1,
    result1:result1,        //返回最近两天的、无权限的项目
    result2:result2        //返回最新两天的、无权限问题
  }
}
=======
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
  var date=new Date();
  var result1 = await DB.select('*').from('project').orderBy('hot', 'desc').havingRaw('project_time > ?', date.getTime() - 2 * 24 * 60 * 60 * 1000).where('power',0);
  var result2 = await DB.select('*').from('question').orderBy('hot', 'desc').havingRaw('question_time > ?', date.getTime() - 2 * 24 * 60 * 60 * 1000).where('power',0);

  var length1 = result1.length;
  var length2 = result1.length;
  for (var i = 0; i < length1; i++) {
    if (result1[i].user_type == 0) {
      var information = await DB.select('*').from('individual').where('individual_id', result1[i].user_id);
      result1[i].user_info = information;
    }
    if (result1[i].user_type == 1) {
      var information = await DB.select('*').from('company').where('company_id', result1[i].user_id);
      result1[i].user_info = information;
    }
  }

  for (var i = 0; i < length2; i++) {
    if (result2[i].user_type == 0) {
      var information = await DB.select('*').from('individual').where('individual_id', result2[i].user_id);
      result2[i].user_info = information;
    }
    if (result2[i].user_type == 1) {
      var information = await DB.select('*').from('company').where('company_id', result2[i].user_id);
      result2[i].user_info = information;
    }
  }
  

  ctx.body = {
    code: 1,
    result1:result1,        //返回最近两天的、无权限的项目
    result2:result2        //返回最新两天的、无权限问题
  }
}

//
>>>>>>> bada01fb4abaf49a6f23e5cef69491e4c48d8e0f
