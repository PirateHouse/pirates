const Router =require('koa-router')

const {verifyToken}=require('../middleware/auth.middleware')
const {
    getRolesIdAndName
} =require('../controller/role.controller')
const rolesRouter =new Router({prefix:'/roles'})

rolesRouter.get('/list',verifyToken,getRolesIdAndName)

module.exports=rolesRouter