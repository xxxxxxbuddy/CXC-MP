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
  let userNum = 0;
  var user = [];
  var question = [];
  var project = [];
  var individual = await DB.select('individual_id', 'individual_name', 'image', 'answer_num', 'project_num', 'question_num', 'fans_num', 'joincommunity_num').from('individual').where('individual_name', 'like', '%' + data.content + '%');
  var company = await DB.select('company_id', 'company_name', 'image', 'answer_num', 'project_num', 'question_num', 'fans_num', 'joincommunity_num').from('company').where('company_name', 'like', '%' + data.content + '%');
  for(var i = 0;i < individual.length ; i++){
    user[userNum] = {
      user_type : 0 ,
      user_id : individual[i].individual_id,
      user_name : individual[i].individual_name,
      image : individual[i].image,
      answer_num: individual[i].answer_num,
      project_num: individual[i].project_num,
      question_num: individual[i].project_num,
      fans_num: individual[i].fans_num
    }
    userNum = userNum + 1;
  }
  for(var j = 0;j < company.length; j++){
    user[userNum]={
      user_type : 1,
      user_id : company[j].company_id,
      user_name : company[j].company_name,
      image : company[j].image,
      answer_num: individual[i].answer_num,
      project_num: individual[i].project_num,
      question_num: individual[i].project_num,
      fans_num: individual[i].fans_num
    }
    userNum = userNum + 1;
  }
  var question = await DB.select('*').from('question').where('question_title', 'like', '%' + data.content + '%').orWhere('question_info', 'like', '%'+data.content+'%');
  var project = await DB.select('*').from('project').where('project_title', 'like', '%' + data.content + '%').orWhere('project_require', 'like', '%' + data.content + '%').orWhere('project_budget', data.content);

  ctx.body = {
    code: 1,
    content:data.content,
    user: user,       
    question: question,
    project: project        
  }
}

