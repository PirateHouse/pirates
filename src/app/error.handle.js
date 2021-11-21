
const errorTypes=require('./error.type')

const errorHandle=(error,ctx)=>{
    let message,code
   switch(error.message){
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
        code=0
        message = "用户名或者密码不能为空~";
        break;
    case errorTypes.USER_ALREADY_EXISTS:
        code=0
        message = "用户名已经存在";
        break;
    case errorTypes.USER_DOES_NOT_EXISTS:
        code=0
        message = "用户名不存在";
        break;
    case errorTypes.PASSWORD_IS_INCORRENT:
        code=0
        message = "密码错误";
        break;
    case errorTypes.USER_IS_HAVE_MENU:
        code=0
        message = "权限分配重复";
        break;
    case errorTypes.UNAUTHORIZATION:
        code=0
        message = "token无效";
        break;    
    case errorTypes.DEPART_NAME_IS_EXISTS:
        code=0
        message = "部门名称重复";
        break;
    case errorTypes.ADMIN_IS_NOT_DELETE:
        code=0
        message = "admin不允许删除";
        break;
    case errorTypes.NUMBER_IS_LESS_THAN_TEN:
        code=0
        message = "数据少于十条，不能再删除啦~";
        break;
           
    case errorTypes.SUPPER_ADMIN_ROLE:
        code=0
        message = "超级管理员的权限不允许删除~";
        break;
    
    case errorTypes.ROLE_NAME_IS_REPEAT:
        code=0
        message = "角色名称重复~";
        break;
    case errorTypes.SUPPER_ADMIN_ROLES_NOT_DELETE:
        code=0
        message = "超级管理员角色不允许删除~";
        break;
        default:
          code=0
            message = "NOT FOUND";

   }
   ctx.body={code,data:[],message}
}
module.exports=errorHandle