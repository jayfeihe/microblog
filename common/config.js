var config = {
    blogName: '个人博客',
    headPicture: '/images/bg.png',
    aPageNum: 7,//分页,一页显示多少文章.
    dbUser: 'root',//dbUser填写 '' 说明数据库和本博客在同一台机器
    dbPass: '1234',
    dbAddress: '192.168.1.120',
    dbPort: '27017',
    dbName: 'microblog',
    ownerName: '逍遥飞鹤',//个人姓名，显示在博主信息中
    ownerLocation: '上海',//所在地，显示在博主信息中
    ownerOccupation: '-',//职业，显示在博主信息中
    ownerSkill: '',//主要从事领域与技能，显示在博主信息中
    motto: 'Thoughts, stories and ideas.',//座右铭，显示在博主信息中
    email: '871825513@qq.com',
    cookieSecret: 'microblogyuanzm',
    serverPlatform: {
        platform: 'local',
        AccessKey: 'xxx',//platform是local可以不填
        SecrectKey: 'xxx',//platform是local可以不填
        buckect: 'x' //bcs中的buckect名字
    },
    mailConfig: {
        service: 'Gmail',//Gmail QQ QQex Yahoo Hotmail
        auth: {
            user: 'longmenwaideyu@gmail.com',
            pass: 'abcd'
        }
    },
    otherBlog: {//你的其他博客，显示在页脚
        url: 'http://blog.csdn.com/he90227',
        name: 'CSDN博客'
    },
    friendlyLinks: [//友情链接，显示在页脚
        { url: 'http://hi.baidu.com/longmenwaideyu', name : '百度博客' }
    ],
    ICPNumber: '沪ICP备00000000号'//显示在页脚
}
module.exports = config;
