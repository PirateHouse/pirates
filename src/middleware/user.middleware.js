const errorTypes=require('../app/error.type')
const {getUserByName }=require('../service/user.service')
const md5password = require('../utils/password-handle')
const verifyUser = (dataName)=>{
    return async  (ctx,next)=>{
        const {name}=ctx.request.body
        // 判断这次注册的用户名没有注册过
        const result =await getUserByName(dataName,name) 
        if(result.length!==0){
            const error =new Error(errorTypes.USER_ALREADY_EXISTS)
            return ctx.app.emit('error',error,ctx)
        }
  
        await next()
    }
}

const passwordHandler=async (ctx,next)=>{
    const { password } = ctx.request.body;
    ctx.request.body.password = md5password(password)    
    await next();
}

module.exports={
    verifyUser,
    passwordHandler
}