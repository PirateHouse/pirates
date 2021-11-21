
const Router =require('koa-router')
const {createUser,getUserList,removeInfoById,editInfo} =require('../controller/user.controller')
const {verifyUser,passwordHandler} =require('../middleware/user.middleware')
const {getUserAvatarById} =require('../controller/file.controller')

const {userNumber} =require('../middleware/number.middleware')
const {verifyToken}=require('../middleware/auth.middleware')
// 注册接口
const userRouter =new Router({prefix:'/users'})
// 添加信息
userRouter.post('/add',verifyUser('users'),passwordHandler,createUser('users'))
// 获取所有注册用户信息
userRouter.get('/list',verifyToken,getUserList('users'))
// 删除信息
userRouter.post('/remove',verifyToken,userNumber('users'),removeInfoById('users'))
// 修改信息
userRouter.post('/edit/:editId',verifyToken,editInfo('users'))
// 获取用户的头像
userRouter.get('/:userId/avatar',getUserAvatarById)

module.exports=userRouter