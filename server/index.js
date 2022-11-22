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





app.post('/loginadmin', (req,res)=> {
  const adminusername = req.body.adminusername;
  const adminpassword = req.body.adminpassword;
  console.log(adminusername);
  db.query(
  "SELECT * FROM admin WHERE adminusername = ? AND adminpassword = ?",
  [adminusername, adminpassword],
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

app.post('/createadmin', (req, res)=> {
  const adminusername = req.body.adminusername
  const adminemail = req.body.adminemail
  const adminpassword = req.body.adminpassword

  db.query("INSERT INTO admin (adminusername, adminemail, adminpassword) VALUES (?,?,?)", 
  [adminusername,adminemail,adminpassword],  
  (err,result) => {
      if (err) {
          console.log(err)
      }
      else{
          res.send("Values inserted")
      }
  });
});

app.get("/admin", (req, res) => {
  db.query("SELECT * FROM admin", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/adminupdate', (req,res) => {
const adminusername = req.body.adminusername;
const adminemail = req.body.adminemail;
db.query("UPDATE admin SET adminemail = ? WHERE adminusername = ?", [adminemail,adminusername], (err,result) => {
  if(err){
    console.log(err);
  } else{
    res.send(result);
  }
});
})

app.delete('/deleteadmin/:adminusername', (req,res) => {
const adminusername = req.params.adminusername;
db.query("DELETE FROM admin WHERE adminusername = ?", adminusername, (err,result) => {
  if(err){
    console.log(err);
  }else{
    res.send(result);
  }
});
});

app.post('/createplayer', (req, res)=> {
  const playerid = req.body.playerid
  const playername = req.body.playername
  const playerposition = req.body.playerposition
  const playerteam = req.body.playerteam

  db.query("INSERT INTO player (playerid, playername, playerposition, playerteam) VALUES (?,?,?,?)", 
  [playerid,playername,playerposition,playerteam],  
  (err,result) => {
      if (err) {
          console.log(err)
      }
      else{
          res.send("Values inserted")
      }
  });
});

app.get("/player", (req, res) => {
  db.query("SELECT * FROM player", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/deleteplayer/:playerid', (req,res) => {
  const playerid = req.params.playerid;
  db.query("DELETE FROM player WHERE playerid = ?", playerid, (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
  });

  app.use((req, res, next) => {
    // If no previous routes match the request, send back the React app.
    res.sendFile(__dirname + "/public/index.html"); 
  });
  
  app.listen(process.env.PORT || 3001, ()=> {
      console.log("Your server is running")
  })

  app.get("/showPlayer/:playername", (req, res) => {
    const playername = req.params.playername;
    db.query("SELECT * FROM player WHERE playername LIKE '%"+playername+"%'", playername, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
     });
    });