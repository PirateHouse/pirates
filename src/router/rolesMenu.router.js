const Router =require('koa-router')

const rolesMenusRouter =new Router({prefix:'/menus'})

const {verifyToken}=require('../middleware/auth.middleware')
const{
    getRoleListInfo,
    verifyRoleAndMenu,
    addMenusByRoles,
    editMenusById
} =require('../controller/role.controller')
 const {removeInfoById} =require('../controller/user.controller')
 const {menuNum} =require('../middleware/menu.number.middleware')
// 获取所有用户列表
rolesMenusRouter.get('/list',verifyToken,getRoleListInfo)
rolesMenusRouter.post('/add',verifyToken,verifyRoleAndMenu,addMenusByRoles)
rolesMenusRouter.post('/remove',verifyToken,menuNum('menu_list'),removeInfoById('menu_list'))
rolesMenusRouter.post('/edit/:id',verifyToken,verifyRoleAndMenu,editMenusById)

module.exports=rolesMenusRouter