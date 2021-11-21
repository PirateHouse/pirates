const Router =require('koa-router')


const changePwdRouter =new Router({prefix:'/changePwd'})

const {changeUserPwd} =require('../controller/changePwd.controller')

changePwdRouter.post('/',changeUserPwd)

module.exports=changePwdRouter