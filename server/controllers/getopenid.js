const request = require("request");
module.exports =async (ctx,next) => {
  let appId = 'wx2541631ee62bb5d9';
  let secret = '3fd33c1b131c7576bbeab34b5e899e0c';
  let js_code = ctx.query;
  let url= `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${js_code.code}&grant_type=authorization_code`;
  let result =await new Promise((resolve, reject) => {
    request(url, (e, r, d) => {
      if (e) {
        return reject(e);
      }
      if (r.statusCode != 200) {
        return reject(`back statusCode：${r.statusCode}`);
      }
      return resolve(d);
    });
  })
  result = JSON.parse(result);
  ctx.body = {
    code: 1,
    result: result,
  }
}