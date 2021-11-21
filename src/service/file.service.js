const connection =require('../app/database')


class FileService{
 async createAvatarInfo(mimetype,filename,size,id){
     try{
        const statement =`INSERT INTO avatar (mimetype,filename,size,user_id)VALUES(?,?,?,?);`
        const [result] =await connection.execute(statement,[mimetype,filename,size,id])
        return result 
     }catch(err){
         console.log(err)
     }
 }
// 获取头像
 async getAvatarById(id){
     const statement =`SELECT * FROM avatar WHERE user_id=?;`
     const [result] =await connection.execute(statement,[id])
     return result[0]
 }
}


module.exports=new FileService()