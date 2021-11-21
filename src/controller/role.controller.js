const {
    getAllRolesList,
    getRolesIdAndInfo,
    addRoleListInfo,
    getTableInfo,
    editTableInfo
} =require('../service/roles.service')
const {addMenusList,verifyMenus,editMenusListInfo} =require('../service/menu.service')
const errorTypes =require('../app/error.type')
const {resultAllData,addResultInfo,editResultInfo} =require('../utils/password-handle')
class RoleController{
    // 获取的是权限和角色关系表
    async   getRoleListInfo (ctx){
        const {currentPage,pageSize} =ctx.query
        const result =await getAllRolesList(currentPage,pageSize)
        ctx.body=resultAllData(result)
    
    }
    
    // 获取角色的id和title
    async getRolesIdAndName(ctx){
        const {currentPage,pageSize} =ctx.query
        const result =await getRolesIdAndInfo(currentPage,pageSize)
        ctx.body={code:1,data:result,message:'请求成功'}
    }
    // 查看角色和权限是否重复
    async verifyRoleAndMenu(ctx,next){
        const {roleId,cascader}=ctx.request.body
        const menu_id=cascader[0]
        const menu_item_id=cascader[1]
        const result =await verifyMenus(roleId,menu_item_id)
        if(result.length!==0){
            const error=new Error(errorTypes.USER_IS_HAVE_MENU)
            return ctx.app.emit('error',error,ctx)
        }
         ctx.roleAndMenu={roleId,menu_id,menu_item_id}
         await next()
    }
    // 添加角色的权限列表
    async addMenusByRoles(ctx){
        const {roleId,menu_id,menu_item_id}=ctx.roleAndMenu
        const result =await addMenusList(roleId,menu_id,menu_item_id)
        ctx.body=addResultInfo()
      
    }
    // 编辑角色的权限列表
    async  editMenusById(ctx){
        const {id}=ctx.params
        const menuInfo=ctx.request.body
        const role_id_or_name=menuInfo.roleName
        let roles_id=0
        if(typeof role_id_or_name ==='string'){
            roles_id=menuInfo.roleId
        }else{
            roles_id=menuInfo.roleName
        }
        const menu_id=menuInfo.cascader[0]
        const menu_item_id=menuInfo.cascader[1]
        const result =await editMenusListInfo(id,menu_id,menu_item_id,roles_id)
        ctx.body=editResultInfo()
    }
    // 增加role
    async  addRoleItemInfo(ctx){
        console.log(ctx.request.body)
        const {roles,role_desc} =ctx.request.body
        const result =await addRoleListInfo(roles,role_desc)
        ctx.body=addResultInfo()
    }
    // 获取role 列表
    async getRoleTableList(ctx){
        const  { currentPage, pageSize }=ctx.query
        const result =await getTableInfo(currentPage, pageSize )
        ctx.body=resultAllData(result)

    }
    async editRoleItemInfo(ctx){
        const {id,roles,role_desc} =ctx.request.body
        const result =await editTableInfo(id,roles,role_desc)
        ctx.body=editResultInfo()
    }
}

module.exports=new RoleController()