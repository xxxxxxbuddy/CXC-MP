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
  var community_id = '';
  var result=[];
  result = await DB.select('*').from('community')
  community_id = await DB.select('community_id').from('community_user').where({ user_id: data.user_id, user_type: data.user_type });
   for(var i=0;i<community_id.length;i++){
     var x = await DB.select('*').from('community').where('community_id', community_id[i].community_id);
     result[i]=x[0];
     result[i].checklabel=0;
   }
  ctx.body = {
    result: result
  }

}