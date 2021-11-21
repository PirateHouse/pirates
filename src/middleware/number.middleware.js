const errorType = require('../app/error.type')

const {selectUserNumber} =require('../service/user.service')

const userNumber=(dataName)=>{
    return async (ctx,next)=>{
        const {id} =ctx.request.body
        const result =await selectUserNumber(dataName)  
        const {number} =result[0]
        if(id===2){
            const error =new Error(errorType.ADMIN_IS_NOT_DELETE)
            return ctx.app.emit('error',error,ctx)
        }
        if (number<=10){
            const error =new Error(errorType.NUMBER_IS_LESS_THAN_TEN)
            return ctx.app.emit('error',error,ctx)
        }
        await next()
        
    }
}

module.exports={
    userNumber
}