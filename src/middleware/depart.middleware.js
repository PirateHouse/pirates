const errorType =require('../app/error.type')
const {verifyDePartName} =require('../service/depart.service')
const verifyDepart=async (ctx,next)=>{
    const {depart_name}=ctx.request.body
    const result =await verifyDePartName(depart_name)
    if(result.length!==0){
        const error =new Error(errorType.DEPART_NAME_IS_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }
    await next()
}


module.exports={
    verifyDepart
}