const fs =require('fs')


const {createAvatarInfo,getAvatarById} =require('../service/file.service')
const {updateUserAvatarById } =require('../service/user.service')
const {updateAvatarInfo} =require('../utils/password-handle')

const config =require('../app/config')
const {AVATAR_PATH} =require('../app/content')
const { fileURLToPath } = require('url')

class FileController{
    // 保存头像
    async saveAvatarInfo(ctx){
        const {mimetype,filename,size}=ctx.req.file
        const {id} =ctx.user
        const result =await createAvatarInfo(mimetype,filename,size,id)
        // 将图片地址保存到users中
        const avatarUrl =`http://${config.APP_HOST}:${config.APP_PORT}/users/${id}/avatar`
        await updateUserAvatarById(avatarUrl,id)
      
        ctx.body=updateAvatarInfo()

    }
    // 获取头像
    async getUserAvatarById(ctx){
        const {userId} =ctx.params
        const result =await getAvatarById(userId)
        // 读取图片并显示
        ctx.response.set('content-type',result.mimetype)
        //读取图片
        ctx.body=fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)


    }

}


module.exports=new FileController()