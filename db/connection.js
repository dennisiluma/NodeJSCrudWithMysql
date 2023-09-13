import mysql from 'mysql2';

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'12345678',
    database:'item_crud',
    connectionLimit:10,
});

pool.getConnection((err, con)=>{
    if(err){
        console.log(`Could Not Cinnect To DB ${err}`)
    }else{
        console.log('Succesfully Connected to my Database')
    }
});
export default pool;