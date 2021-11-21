const {roleNameIsEXISTS,roleNameIsSupper} =require('../service/roles.service')
const errorType =require('../app/error.type')

// 角色姓名不能重复
const roleNameIsRepeat=async(ctx,next)=>{
    const {roles}=ctx.request.body
    const result =await roleNameIsEXISTS(roles)
    if(result.length!==0){
        const error =new Error(errorType.ROLE_NAME_IS_REPEAT)
        return ctx.app.emit('error',error,ctx)
    }
    await next()
}

// 超级管理员不允许删除
const roleNameSupper=async (ctx,next)=>{
    const {id}=ctx.request.body
    const result =await roleNameIsSupper(id)
    const {roles} =result[0]
    if(roles==='超级管理员'){
        const error =new Error(errorType.SUPPER_ADMIN_ROLES_NOT_DELETE)
        return ctx.app.emit('error',error,ctx)
    }
    await next()

}

module.exports={
    roleNameIsRepeat,
    roleNameSupper
}