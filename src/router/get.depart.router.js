const Router =require('Koa-router')

const getDepartRouter =new Router({prefix:'/infoDepart'})

const {verifyToken}=require('../middleware/auth.middleware')
const {getDepartSelectList} =require('../controller/depart.controller')
getDepartRouter.get('/list',verifyToken,getDepartSelectList)


module.exports=getDepartRouter