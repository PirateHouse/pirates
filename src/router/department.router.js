const Router =require('koa-router')
// 部门接口
const departmentRouter =new Router({prefix:'/depart'})
const {verifyToken}=require('../middleware/auth.middleware')
const {verifyDepart} =require('../middleware/depart.middleware')
const {
    addDepartInfo,
    getDepartList,
    editDepartList
}=require('../controller/depart.controller')

const {removeInfoById} =require('../controller/user.controller')

departmentRouter.post('/add',verifyToken,verifyDepart,addDepartInfo)
departmentRouter.get('/list',verifyToken,getDepartList)
departmentRouter.post('/edit/:id',verifyToken,editDepartList)
departmentRouter.post('/remove',verifyToken,removeInfoById('department'))

module.exports=departmentRouter