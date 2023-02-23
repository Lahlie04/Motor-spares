const mysql = require('mysql')
const express = require('express')
const bodyparser = require('body-parser')


var app = express()
app.use(bodyparser.json());

// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password:'',
//     database: 'motor_spares',
//     multipleStatements: true
// });


const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'motor_spares'
})
// mysqlConnection.connect((err)=>{
//     if(!err)
//     console.log('Database connection succeded.');
//     else
//     console.log('Database conection failed \n Error : ' + JSON.stringify(err,undefined,2));

// })

app.listen(3000,()=>console.log('Server is running on port no : 3000'));



//Insert a shop

// app.post('/shops',(req,res)=>{
//     let i = req.body;
//     var sql = "SET @shop_ID = ?; SET @shopName = ?; SET @shopLoc = ?;SET @time = ?; SET @telephone = ?; SET @email = ?\
//      CALL shop(@shop_ID,@shopName,@shopLoc,@time,@telephone,@email);";

//     mysqlConnection.query(sql,[i.shop_ID, i.shopName, i.shopLoc, i.time, i.telephone, i.email],(err, rows, fields)=>{
//         if(!err)
       
//         res.send(rows);
        
//         else
//         console.log(err);
//     })
// })

// Add shops
app.post('/shops', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO shop SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Shop successfully added!`)
        } else {
            console.log(err)
        }
        
        console.log( rows)

        })
    })
});


// Get all shops
app.get('/shops', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM shop', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from the shop table are: \n', rows)
        })
    })
})