const md5password =require('../utils/password-handle')
const {editResultInfo} =require('../utils/password-handle')
const {updateUserPWD} =require('../service/user.service')
const changeUserPwd=async (ctx)=>{
        const {name}=ctx.request.body
        const newPwd=md5password(ctx.request.body.newPwd)
        const result =await updateUserPWD(name,newPwd)
        ctx.body=editResultInfo()
}

module.exports={
    changeUserPwd
}