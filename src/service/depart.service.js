const connection =require('../app/database')

class DepartService{
    async addDepartmentList(depart_name,depart_leader){
        const statement=`insert into department (depart_name,depart_leader)values(?,?);`
        const result =await connection.execute(statement,[depart_name,depart_leader])
        return result
    }
    async verifyDePartName(depart_name){
        const statement =`select * from department where depart_name=?;`
        const result =await connection.execute(statement,[depart_name])
        return result[0]
    }
    async getDepartInfo (currentPage,pageSize){
        const statement =`select * from department limit ? offset ?;`
        const result =await connection.execute(statement,[pageSize+'',currentPage+''])
        const result1 ={total:result[0].length}
        return [result[0],result1]
    }
    async editDepartInfo(id,depart_leader,depart_name){
        const statement =`update  department set depart_name=?,depart_leader=? where id=?;`
        const result =await connection.execute(statement,[depart_name,depart_leader,id])
        return result
    }
    async getDepartSelectInfo(currentPage,pageSize){
        const statement =`select id, depart_name from department limit? offset?;`
        const result =await connection.execute(statement,[pageSize+'',currentPage+''])
        return result[0]
    }
}



module.exports=new DepartService()