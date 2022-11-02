const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'user_db'
});

app.post('/create', (req, res)=> {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    db.query("INSERT INTO user (username, email, password) VALUES (?,?,?)", 
    [username,email,password],  
    (err,result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send("Values inserted")
        }
    });
});

app.get("/user", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put('/update', (req,res) => {
  const username = req.body.username;
  const email = req.body.email;
  db.query("UPDATE SET user email = ? WHERE username = ?", [email,username], (err,result) => {
    if(err){
      console.log(err);
    } else{
      res.send(result);
    }
  });
})
app.listen(3001, ()=> {
    console.log("Your server is running")
})