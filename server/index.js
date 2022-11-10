const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json());

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
app.listen(process.env.PORT || 3001, ()=> {
    console.log("Your server is running")
})

