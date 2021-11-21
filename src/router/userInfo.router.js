const Router =require('koa-router')
const {verifyToken}=require('../middleware/auth.middleware')
const {getRoles} =require('../controller/userInfo.controller')

const userInfoRouter =new Router({prefix:'/userInfo'})
// 登录时，获取登录用户信息
userInfoRouter.get('/:id',verifyToken,getRoles)

module.exports=userInfoRouter