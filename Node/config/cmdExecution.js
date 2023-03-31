const connection =require('./db.js');

module.exports.exeCommand=(command)=>{
    return new Promise((resolve,reject)=>{
        connection.query(command,(err,result)=>{
            if(err) reject(err)
            else resolve(result)
        })
    })
}