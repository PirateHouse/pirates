const connection =require('../app/database')

class UserService{
     // 注册用户
     async  create (dataName,user){
               const {name,password,role_id,depart_id} =user
               const statement =`INSERT INTO ${dataName} (name,password,role_id,depart_id) VALUES(?,?,?,?);`
               const result =await connection.execute(statement,[name,password,role_id,depart_id])
               return result
     
     }
     // 查找用户名是否已注册
     async getUserByName(dataName,name){
          const statement =`SELECT * FROM ${dataName} WHERE name=?;`
          const result =await connection.execute(statement,[name])
          return result[0]
     }
     // 获取用户列表信息
     async getUserInfo(dataName, currentPage,pageSize){
          const statement =`
          select u.id ,u.name, u.createAt,u.updateAt,u.role_id, u.depart_id,r.roles roleName, d.depart_name departName
          from users u 
          LEFT JOIN roles r  on  u.role_id=r.id
          LEFT JOIN department d on u.depart_id =d.id 
           LIMIT ? OFFSET ?;`
          const statement1 =`SELECT count( * ) AS total FROM  ${dataName};`
          const result =await connection.execute(statement,[pageSize+'',currentPage+''])
          const result1=await connection.execute(statement1)
          return [result[0],result1[0][0]]


     }
     // 删除用户信息
     async removePageData(dataName,id){
          const statement =`DELETE  FROM ${dataName} WHERE id=?;`
          const result =await connection.execute(statement,[id])
          return result

        
     }
     // 修改用户信息
     async editPageInfo(dataName,name,id,role_id,depart_id){
         
          const statement =`update ${dataName}  set  name=?, role_id=?,depart_id=? where id=?;;`
          const result =await connection.execute(statement,[name,role_id,depart_id,id])
          return result
         
         
     }
     // 保存头像
     async updateUserAvatarById(avatar_url,id){
          const statement=`UPDATE users SET avatar_url=? WHERE id=?;`
          const [result]=await connection.execute(statement,[avatar_url,id])
          return result
     }
     // 修改密码
     async updateUserPWD(name,newPwd){
          const statement =`UPDATE users set password=? where name=?;`
          const result =await connection.execute(statement,[newPwd,name])
          return result
     }
     //查看用户表还有几条数据，少于10条不让删
     async selectUserNumber(dataName){
          const statement =`select count(*) number from ${dataName};`
          const result =await connection.execute(statement)
          return result[0]
     }
}

module.exports=new UserService()