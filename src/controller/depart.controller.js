const  {
    addDepartmentList,
    getDepartInfo,
    editDepartInfo,
    getDepartSelectInfo
} =require('../service/depart.service')
const {resultAllData,addResultInfo,editResultInfo} =require('../utils/password-handle')
class DepartController{
    async addDepartInfo(ctx,next){
        const {depart_name,depart_leader}=ctx.request.body
        const result =await addDepartmentList(depart_name,depart_leader)
        ctx.body=addResultInfo()
    }
    async getDepartList(ctx){
        const {currentPage,pageSize}=ctx.query
        const result =await getDepartInfo(currentPage,pageSize)
        ctx.body=resultAllData(result)
    }
    async editDepartList(ctx){
        const {id,depart_leader,depart_name}=ctx.request.body
        const result =await editDepartInfo(id,depart_leader,depart_name)
        ctx.body=editResultInfo()
    }
    async getDepartSelectList(ctx){
        const {currentPage,pageSize}=ctx.query
        const result =await getDepartSelectInfo(currentPage,pageSize)
        ctx.body={code:1,data:result,message:'请求成功'}
    }
}


module.exports=new DepartController()