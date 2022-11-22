const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')
const cors = require("cors");
const exp = require('constants');

app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
//app.use(express.json);
//app.use(express.urlencoded({
//  extended:true
//}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const db = mysql.createConnection({
    user: 'sql7544337',
    host: 'sql7.freesqldatabase.com',
    password: 'zpPSh1rZ5m',
    database: 'sql7544337'
});
app.get('/', (req, res, next) => {

  res.status(200).json({
      status: 'success',
      data: {
          name: 'Futboss',
          version: '0.1.0'
      }
  });

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
  db.query("UPDATE user SET email = ? WHERE username = ?", [email,username], (err,result) => {
    if(err){
      console.log(err);
    } else{
      res.send(result);
    }
  });
})

app.delete('/delete/:username', (req,res) => {
  const username = req.params.username;
  db.query("DELETE FROM user WHERE username = ?", username, (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
});

app.post('/login', (req,res)=> {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(path.join((__dirname, '/../client/public')));
  db.query(
  "SELECT * FROM user WHERE username = ? AND password = ?",
  [username, password],
  (err,result) => {
    if(err)
    {
      res.send({err: err})
    }
    
      if(result.length > 0)
      {
        res.send(result);
      }
      else{
        res.send({message: "Wrong username password combination"})
      }
  
  }
  );
});


app.get("/*", (req, res) => { console.log("I am here"); res.sendFile(path.join(__dirname,'./../client/public/index.html')); });

app.listen(process.env.PORT || 3001, ()=> {
    console.log("Your server is running")
})

