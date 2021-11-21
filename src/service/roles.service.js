const connnection=require('../app/database')
class Roles{
    // 获取当前用户信息
    async getRolesByName(id){
            const statement =`select users.id , users.name userName, users.avatar_url,users.role_id ,roles.roles roleName, users.depart_id ,department.depart_name
            from users LEFT JOIN roles on  users.role_id=roles.id
            LEFT JOIN department on users.depart_id =department.id
            where users.id=?;`
            const result =await connnection.execute(statement,[id])
            return result[0]
    }
    // 获取所有用户信息
    async getAllRolesList(currentPage,pageSize){
        const statement =`SELECT
        ml.id,r.id roleId,r.roles roleName,
        m.id menuId ,m.title menusTitle,mi.id menusId, mi.title menusItem
        from menu_list ml
        left join roles   r on ml.roles_id =r.id
        left join menus m on m.id =ml.menu_id
        LEFT JOIN menusitem mi on mi.id=ml.menu_item_id  LIMIT ? OFFSET ?;`
        const result =await connnection.execute(statement,[pageSize+'',currentPage+''])
        const statement1=`select count(*) as total from menu_list;`
        const result1=await connnection.execute(statement1)
        return [result[0],result1[0][0]]
    }
    // 获取role信息
    async getRolesIdAndInfo(currentPage,pageSize){
        const statement =`select id,roles from roles limit ? offset ? ;`
        const result =await connnection.execute(statement,[pageSize+'',currentPage+''])
       return result[0]
    }
    async addRoleListInfo(roles,role_desc){
        const statement =`insert into roles (roles,role_desc)values(?,?);`
        const result =await connnection.execute(statement,[roles,role_desc])
        return result
    }
    async getTableInfo(currentPage, pageSize){
        const statement =`select * from roles limit? offset?;`
        const result =await connnection.execute(statement,[pageSize+'',currentPage+''])
        const statement1=`select count(*) as total from roles;`
        const result1=await connnection.execute(statement1)
        return [result[0],result1[0][0]]
    }
    async editTableInfo(id,roles,role_desc){
        const statement =`update roles set roles=? ,role_desc=? where id=?;`
        const result =await connnection.execute(statement,[roles,role_desc,id])
        return result
    }
    async roleNameIsEXISTS(roles){
        const statement =`select * from roles where roles.roles=?;`
        const result =await connnection.execute(statement,[roles])
        return result[0]
    }
    async roleNameIsSupper (id){
        const statement =`select * from  roles where roles.id=?;`
        const result =await connnection.execute(statement,[id])
        return result[0]
    }
}


module.exports=new Roles()