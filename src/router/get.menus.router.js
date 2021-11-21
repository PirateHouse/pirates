const Router = require('Koa-router')

const getMenusListRouter =new Router({prefix:'/infoMenus'})
const {verifyToken}=require('../middleware/auth.middleware')
const {getMenuList} =require('../controller/menu.controller')
 
getMenusListRouter.get('/list',verifyToken,getMenuList)

module.exports=getMenusListRouter