const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx2541631ee62bb5d9',

    // 微信小程序 App Secret
    appSecret: '635294160b71b034f86eaaad14dedc9e',  //09d9c768533c08516a46bf339b36adfc  => getOpenid.js

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
      host: 'localhost', //134.175.84.135
        port: 3306,
        user: 'root',
        db: 'cAuth',
        //pass: 'wx2541631ee62bb5d9', //开发环境
        pass: 'UvT08wlg',         //生产环境
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
