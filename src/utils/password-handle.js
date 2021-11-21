const crypto = require('crypto');
const { Interface } = require('readline');

const md5password = (password) => {

        const md5 = crypto.createHash('md5');
        const result = md5.update(password).digest('hex');
        return result;
  
}

// 获取table列表
const resultAllData=(result)=>{
        if(result.length!==0){
                return {
                        code:1,
                        data:result[0],
                        total:result[1].total,
                        message:'请求成功'
                }
        }
        return {
                code:0,
                data:[],
                total:0,
                message:'请求失败'
        }
}
// 添加数据
const addResultInfo =()=>{
        return {
                code:1,
                message:'添加成功'
        }
}
// 编辑数据
const editResultInfo =()=>{
        return {
                code:1,
                message:'编辑成功'
        }
}
// 删除数据
const removeResultInfo =()=>{
        return {
                code:1,
                message:'删除成功'
        }
}
// 图片上传成功
const updateAvatarInfo =()=>{
        return {
                code:1,
                message:'图片上传成功'
        }
}



module.exports = md5password;

module.exports.resultAllData=resultAllData
module.exports.addResultInfo=addResultInfo
module.exports.editResultInfo=editResultInfo
module.exports.removeResultInfo=removeResultInfo
module.exports.updateAvatarInfo=updateAvatarInfo


