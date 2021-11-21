const Router =require('koa-router')
// 登录接口
const authRouter =new Router({prefix:'/login'})
const {login}=require('../controller/auth.controller')
const {verifyAuth} =require('../middleware/auth.middleware')

authRouter.post('/',verifyAuth('users'),login)



module.exports=authRouter