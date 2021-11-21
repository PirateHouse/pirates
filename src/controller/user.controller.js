const {create} =require('../service/user.service')

const {resultAllData,addResultInfo,removeResultInfo,editResultInfo} =require('../utils/password-handle')
const {getUserInfo,removePageData ,editPageInfo} =require('../service/user.service')

// 注册新用户
    const  createUser =(dataName)=>{
        return async(ctx)=>{
            const user=ctx.request.body
            console.log(user)
            const result =await create(dataName,user)
            ctx.body=addResultInfo()
        }
    }
    
    // 获取用户列表
     const  getUserList= (dataName)=>{
            return async (ctx,next)=>{
                const {currentPage,pageSize} =ctx.query
                const result =await getUserInfo(dataName,currentPage,pageSize)
                ctx.body=resultAllData(result)
            }
        }
    // 删除信息
    const removeInfoById = (dataName)=>{
        return async (ctx,next)=>{
            const {id } =ctx.request.body
            const result =await removePageData(dataName,id)
            ctx.body=removeResultInfo()
        }
    }
    // 修改信息
    const editInfo =(dataName)=>{
        return async (ctx)=>{
            const id=ctx.params.editId
            const {name,role_id,depart_id} =ctx.request.body
            const result =await editPageInfo(dataName,name,id,role_id,depart_id)
            ctx.body=editResultInfo()
        }
    }
    
module.exports={
    createUser,
    getUserList,
    removeInfoById,
    editInfo
}