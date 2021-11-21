
const jwt =require('jsonwebtoken')

const errorTypes =require('../app/error.type')
const {getUserByName} =require('../service/user.service')
const md5password =require('../utils/password-handle')

const {PUBLIC_KEY} =require('../app/config')


const verifyAuth= (dataName)=>{
   return  async (ctx,next)=>{
        const {name,password}=ctx.request.body
        // 判断登录的用户名密码是否存在
        if(!name||!password||name===''||password===""){
            const error =new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
            return ctx.app.emit('error',error,ctx)
        }
        // 获取数据库的数据 ，是否有注册过
        const result =await getUserByName(dataName,name)
        if(result.length===0){
            const error=new Error(errorTypes.USER_DOES_NOT_EXISTS)
            return ctx.app.emit('error',error,ctx)
        }
        // 判断密码是否一致
        const user=result[0]
        if(md5password(password)!==user.password){
            const error =new Error(errorTypes.PASSWORD_IS_INCORRENT)
            return ctx.app.emit('error',error,ctx)
    
        }
        
        ctx.user=user
        await next()
    
    
    }
}


const verifyToken = async (ctx,next)=>{
    const headers =ctx.headers.authorization
    if(!headers){
        const error =new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error',error,ctx)
    }
    const token =headers.replace('Bearer ','')
  
    try{
        const result= jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        })
        ctx.user=result
        await next()
    }catch(err){
        const error =new Error(errorTypes.UNAUTHORIZATION)
        ctx.app.emit('error',error,ctx)
    }
}




module.exports={
    verifyAuth,
    verifyToken
}