
const errorType =require('../app/error.type')
const {getMeneRole} =require('../service/menu.service')
// 超级管理员的权限不允许删除
const menuNum=(dataName)=>{
    return async (ctx,next)=>{
        const {id}=ctx.request.body
        const result =await getMeneRole(dataName,id)
        const {roles} =result[0]
        if(roles==='超级管理员'){
            const error=new Error(errorType.SUPPER_ADMIN_ROLE)
            return ctx.app.emit('error',error,ctx)
        }
        await next()
    }
}




module.exports={
    menuNum
}