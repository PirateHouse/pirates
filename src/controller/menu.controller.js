
const {getMenusByRoles,getMenusInfo} =require('../service/menu.service')

class MenusController{
  // 用角色拿到对应的路径
 async getMenus (ctx,next){
    const {id}=ctx.params
    const result =await getMenusByRoles(id)
    ctx.body=result
}
// 获取所有的用户路径
async getMenuList(ctx,next){
  const {currentPage,pageSize} =ctx.query
  const result =await getMenusInfo(currentPage,pageSize)
  ctx.body={code:1,data:result,message:'请求成功'}
}
}

module.exports=new MenusController()