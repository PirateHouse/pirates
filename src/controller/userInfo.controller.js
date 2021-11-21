
const {getRolesByName} =require('../service/roles.service')

const {resultAllData} =require('../utils/password-handle')
class UserInfoController{
// 获取用户角色
    async getRoles (ctx){
        const {id }=ctx.params
        const result1 =await getRolesByName(id)
        const result=result1[0]
        ctx.body=result
    }
}


module.exports=new UserInfoController()