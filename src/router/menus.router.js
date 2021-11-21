const Router =require('koa-router')
const userMenusRouter =new Router({prefix:'/userMenus'})

const {verifyToken}=require('../middleware/auth.middleware')
const {getMenus} =require('../controller/menu.controller')

// 获取当前用户的菜单
userMenusRouter.get('/:id',verifyToken,getMenus)

userMenusRouter.get('/list',verifyToken,(ctx,next)=>{
    console.log('废物')
})
module.exports=userMenusRouter