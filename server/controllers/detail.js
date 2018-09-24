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
  var result='';
  var answer='';
  if (data.object_type==0){
    result = await DB.select('*').from('project').where('project_id', data.object_id);
    answer = await DB.select('*').from('answer').where('object_id', data.object_id); 
  }
  else{
    result = await DB.select('*').from('question').where('question_id', data.object_id)
    answer = await DB.select('*').from('answer').where('object_id', data.object_id); 
  }
  ctx.body = {
    result: result,
    answer: answer
  }
}