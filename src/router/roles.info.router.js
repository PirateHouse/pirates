const Router =require('koa-router')

const  roleInfoRouter =new Router({prefix:'/roleInfo'})

const {verifyToken}=require('../middleware/auth.middleware')
const {
    addRoleItemInfo,
    getRoleTableList,
    editRoleItemInfo
} =require('../controller/role.controller')

const {removeInfoById} =require('../controller/user.controller')


const {roleNameIsRepeat,roleNameSupper} =require('../middleware/role.middleware')

roleInfoRouter.get('/list',verifyToken,getRoleTableList)

roleInfoRouter.post('/add',verifyToken,roleNameIsRepeat,addRoleItemInfo)
roleInfoRouter.post('/edit/:id',verifyToken,roleNameIsRepeat,editRoleItemInfo)

roleInfoRouter.post('/remove',verifyToken,roleNameSupper,removeInfoById('roles'))

module.exports=roleInfoRouter