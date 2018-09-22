/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

//处理传过来的信息
//router.get('/regs',controllers.regs)

//发布问题
router.get('/pub_question',controllers.pub_question)

//发布项目
router.get('/pub_project',controllers.pub_project)

//获取首页内容
router.get('/home_page',controllers.home_page)

//圈子内容推荐
router.get('/home_community',controllers.home_community)

//动态内容推荐
//router.get('/home_dongtai', controllers.home_dongtai)


//个人用户注册
router.get('/regs_individual', controllers.regs_individual)

//公司用户注册
router.get('/regs_company', controllers.regs_company)

//新建圈子
router.get('/regs_community', controllers.regs_community)

//获取详情
router.get('/detail', controllers.detail)

//获取圈子
router.get('/user_community', controllers.user_community)

//评论
router.get('/comment',controllers.comment)

//点赞
router.get('/praise',controllers.praise)

//回答问题
router.get('/praise',controllers.answer)




module.exports = router

