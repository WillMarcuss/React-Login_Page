const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Credentials"
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM Credentials";
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    });
})

app.post('/api/insert',(req,res)=>{

    const username = req.body.username
    const password = req.body.password


    const sqlInsert = "INSERT INTO Credentials (Username, Password) VALUES (?,?)"
    db.query(sqlInsert, [username, password], (err, result)=>{
        console.log(err)
    })
})

app.listen(3001, ()=> {
    console.log("running on port 3001")
});