const mysql=require('mysql');
const mysqlSetting={
    host:'192.168.1.123',
    user:'root',
    password:'Dnpl@2015',
    port:3309,
    database:'aman_practice',
    multipleStatements:true,
    dateString:true
};

const conn=mysql.createPool(mysqlSetting);

module.exports=conn;