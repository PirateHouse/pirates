const Router =require('koa-router')
// 上传头像
const fileRouter =new Router({prefix:'/upload'})
const {verifyToken}=require('../middleware/auth.middleware')
const {avatarHandler } =require('../middleware/file.middleware')
const {saveAvatarInfo } =require('../controller/file.controller')
fileRouter.post('/avatar',verifyToken,avatarHandler,saveAvatarInfo)

module.exports=fileRouter
