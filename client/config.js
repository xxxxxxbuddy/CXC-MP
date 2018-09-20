/**
  小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://sl5hr478.qcloud.la';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,


        //注册上传信息接口------该页面用于调试，无意义
       //regcurl: `${host}/weapp/regs`,

       //用于发布项目-----关于权限后台仍需完善，暂时均默认全公开
       //前端需传输数据，user_id:18211949726, project_title: '商城开发', project_type: '微信小程序开发', project_period: '两个月', project_budget: 1000, project_time: project_time, project_require: '能快速开发，有经验'
        pub_project: `${host}/weapp/pub_project`,

      //用于发布问题-----关于权限后台仍需完善，暂时均默认全公开
      //(前端需传输数据，user_id: 18211949726, question_title: '公司如何解决员工问题', question_info: '我们公司是一个小公司.....'
        pub_question: `${host}/weapp/pub_question`,

       //用于首页推荐
       //（前端无需传输数据）
        home_page: `${host}/weapp/home_page`,

       //用于圈子内动态展示
       //（前端需传输数据，user_id:18211949726）
      home_community: `${host}/weapp/home_community`,

      //用于关注的动态展示
      //（前端需传输数据，user_id:18211949726）
      //home_dongtai: `${host}/weapp/home_dongtai`,

       //个人用户注册
       //（前端需传过来的数据：例如：individual_id: 18211949729, individual_name: '周星驰', individual_job: '本科生', individual_corporation: '华中科技大学', individual_state: '明星人物（农民）', individual_introduce: '这个人很懒什么都没写'）,后台返回
      regs_individual: `${host}/weapp/regs_individual`,

      
      //公司用户注册
      //（前端需传过来的数据：例如：individual_id: 18211949729, individual_name: '周星驰', individual_job: '本科生', individual_corporation: '华中科技大学', individual_state: '明星人物（农民）', individual_introduce: '这个人很懒什么都没写'
      regs_company: `${host}/weapp/regs_company`,

      //建圈
      //前端需传过来数据：user_id: 18211949726,community_name:'文艺圈',community_type:'文学',community_introduce:'无'
      regs_community: `${host}/weapp/regs_community`,

      detail: `${host}/weapp/detail`,

      user_community: `${host}/weapp/user_community`,

      //评论
      comment: `${host}/weapp/comment`,
      //点赞
      prise: `${host}/weapp/praise`,
      //回答
      answer: `${host}/weapp/answer`
        
    }
};

module.exports = config;
