const jwt =require('jsonwebtoken')

const {PRIVATE_KEY }=require('../app/config')

class AuthController{
        async login(ctx,next){
            const {id,name}=ctx.user
            // 颁发token
            const token =jwt.sign({id,name},PRIVATE_KEY,{
                expiresIn:60*60*24,
                algorithm:'RS256'
            })
            const result = { 
                id,
                name,
                token
            }
            ctx.body=result
        }
}

module.exports=new AuthController()