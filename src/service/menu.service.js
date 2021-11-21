
const connection =require('../app/database')

class MenuService{
    async getMenusByRoles(roleID){
        try {
        const statement =`SELECT 
        mn.id,
       mn.type,
       mn.title,
       mn.icon,
       JSON_ARRAYAGG(JSON_OBJECT(
       'id',  mi.id,
       'type',mi.type ,
       'title', mi.title,
       'path', mi.path))AS children
       FROM menus mn 
        JOIN menu_list ml  ON mn.id=ml.menu_id
        JOIN roles   ON roles.id=ml.roles_id
        JOIN menusitem mi ON ML.menu_item_id=mi.id WHERE roles.id='${roleID}' GROUP BY mn.id;`
        const result =await connection.execute(statement,[roleID])
        return result[0]
        } catch (error) {
            console.log(error)
        }
        
    }
    async getMenusInfo(currentPage,pageSize){
        const statement =`SELECT m.id,m.title ,
        JSON_ARRAYAGG(JSON_OBJECT('id',mn.id,'title',mn.title)) children from  menus m
        left JOIN menu n on n.menu_id =m.id
        left JOIN menusitem mn on mn.id=n.item_id 
        GROUP BY m.id LIMIT ? OFFSET ?;`
        const result =await connection.execute(statement,[pageSize+'',currentPage+''])
        return result[0]
    }

    async verifyMenus(roles,menu_item_id){
        const statement =`select * from menu_list ml
        where ml.roles_id =? and ml.menu_item_id=?;`
        const result =await connection.execute(statement,[roles,menu_item_id])
        return result[0]
    }

    async addMenusList(roleId,menu_id,menu_item_id){
        try {
            const statement =`INSERT INTO menu_list (menu_id,menu_item_id,roles_id)VALUES(?,?,?);`
            const result =await connection.execute(statement,[menu_id,menu_item_id,roleId])
            return result
        } catch (error) {
            console.log(error)
        }
        
    }
    async editMenusListInfo(id,menu_id,menu_item_id,roles_id){
        try {
            console.log(id,menu_id,menu_item_id,roles_id)
            const statement =`update menu_list set menu_id=?,menu_item_id=?,roles_id=? where id=?;`
        const result =await connection.execute(statement,[menu_id,menu_item_id,roles_id,id])
        return result
        } catch (error) {
            console.log(error)
        }
    }
    async getMeneRole(dataName,id){
        const statement =`select * from ${dataName} left join roles on roles.id=${dataName}.roles_id where ${dataName}.id=?;`
        const result =await connection.execute(statement,[id])
        return result[0]
    }
}

module.exports=new MenuService()
