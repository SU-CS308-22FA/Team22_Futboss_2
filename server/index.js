import path from "path"
import express from "express"
import bodyParser from "body-parser"
import mysql from "mysql"
import cors from "cors"
import exp from "constants"
import { getRelationships, addRelationship, deleteRelationship } from "./controllers/relationships.js";
import { MongoClient, ObjectId } from "mongodb"
import { callbackify } from "util"

const app = express()
const __dirname = path.resolve();
const uri = "mongodb+srv://futboss2:futboss2022@cluster0.48gglji.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
var futdb = client.db("futboss2");
app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
//app.use(express.json);
//app.use(express.urlencoded({
//  extended:true 
//}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
export const db = mysql.createConnection({
    user: 'sql7544337',
    host: 'sql7.freesqldatabase.com',
    password: 'zpPSh1rZ5m',
    database: 'sql7544337'
});


async function main() {
  
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log("Success");

    var futdb = client.db("futboss2");
    var myobj = {
      "_id": {
        "username": "emre"
      },
      "email": "emre@gmail.com",
      "password": "1234",
      "name": "emre",
      "surname": "bilen",
      "age": 30,
      "following": [
        {
          "playerid": "6398bcef102a878cbced18da"
        }
      ]
    };

    console.log(await futdb.collection("totw").findOne());
   /* futdb.collection("user").insertOne(myobj, function(err,res) {
      if(err) throw err;
      console.log("1 document inserted");
    });*/
  
    console.log("Here");


    //console.log(await client.db().admin().listDatabases());
    // Make the appropriate DB calls
    //await  listDatabases(client);

} catch (e) {
    console.error(e);
} finally {
    //await client.close();
    console.log("here 2");

}

}

/*async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};*/

main().catch(console.error);




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

    console.log("Selam"); 
    
   

  
    var myobj = {
      "_id": {
        "username": username
      },
      "email": email,
      "password": password,
      "following": [
        {
          "playerid": "6398bcef102a878cbced18da"
        }
      ]
    };

    futdb.collection("user").insertOne(myobj, function(err,res) {
      if(err) throw err;
      console.log("1 document inserted");
    })

  });

   /* db.query("INSERT INTO user (username, email, password) VALUES (?,?,?)", 
    [username,email,password],  
    (err,result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send("Values inserted")
        }
    });
});*/



app.get("/user", (req, res) => {
  futdb.collection("user").find(function(err,res) {
    if(err) throw err;
    console.log("1 document inserted");
  })
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

app.put('/updaterating', (req,res) => {
  const username = req.body.username;
  const userrating = req.body.userrating;
  
  var myquery = {"_id":{"username":username}};
  var newvalues = {$set: {"password":password}};

  futdb.collection("totw").updateOne(myquery,newvalues, function(err,res){
    if (err) throw err;
    console.log("1 document updated");
  });
  db.query("UPDATE user SET userrating = ? WHERE username = ?", [userrating,username], (err,result) => {
    if(err){
      console.log(err);
    } else{
      res.send(result);
    }
  });
})



app.put('/updatepass', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  var myquery = {"_id":{"username":username}};
  var newvalues = {$set: {"password":password}};

  futdb.collection("user").updateOne(myquery,newvalues, function(err,res){
    if (err) throw err;
    console.log("1 document updated");
  });
  

  /*db.query("UPDATE user SET password = ? WHERE username = ?", [password,username], (err,result) => {
    if(err){
      console.log(err);
    } else{
      res.send(result);
    }
  });*/
});
app.put('/updatename', (req,res) => {
  const username = req.body.username;
  const name = req.body.name;

  var myquery = {"_id":{"username":username}};
  var newvalues = {$set: {"name":name}};

  futdb.collection("user").updateOne(myquery,newvalues, function(err,res){
    if (err) throw err;
    console.log("1 document updated");
  });
  /*db.query("UPDATE user SET name = ? WHERE username = ?", [name,username], (err,result) => {
    if(err){
      console.log(err);
    }
    else {
      res.send(result);
    }
  });*/
})

app.put('/updatesurname', (req,res) => {
  const username = req.body.username;
  const surname = req.body.surname;
  console.log(surname);

  var myquery = {"_id":{"username":username}};
  var newvalues = {$set: {"surname":surname}};

  futdb.collection("user").updateOne(myquery,newvalues, function(err,res){
    if (err) throw err;
    console.log("1 document updated");
  });
  /*db.query("UPDATE user SET surname = ? WHERE username = ?", [surname,username], (err,result) => {
    if(err){
      console.log(err);
    }
    else {
      res.send(result);
    }
  });*/
})

app.put('/updateage', (req,res) => {
  const username = req.body.username;
  const age = req.body.age;
  var myquery = {"_id":{"username":username}};
  var newvalues = {$set: {"age":age}};

  futdb.collection("user").updateOne(myquery,newvalues, function(err,res){
    if (err) throw err;
    console.log("1 document updated");
  });
 /* db.query("UPDATE user SET age = ? WHERE username = ?", [age,username], (err,result) => {
    if(err){
      console.log(err);
    }
    else {
      res.send(result);
    }
  });*/
})

app.delete('/delete/:username', (req,res) => {
  const username = req.params.username;
  var myquery = {"_id":{"username":username}};
  //var newvalues = {$set: {"password":password}};

  futdb.collection("user").deleteOne(myquery, function(err,res){
    if (err) throw err;
    console.log("1 document deleted");
  });
  /*db.query("DELETE FROM user WHERE username = ?", username, (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });*/
});

app.post('/bugreport', (req,res)=> {
  const name= req.body.name;
  const email= req.body.email;
  const subject= req.body.subject;
  const message= req.body.message
  console.log(req.body)
  var myobj = {
    "_id": {
      "name": name,
    },
    "name": name,
    "email": email,
    "subject": subject,
    "message":message,
    
  };

  futdb.collection("bugreport").insertOne(myobj, function(err,_) {
    if(err) {
      console.log(err)
    }
    console.log("1 bug report inserted");
    
  })

  res.status(200).json({
    message:"success",
})

});

app.post('/bugcomment', (req,res)=> {
  const adminusername= req.body.adminusername;
  const comment= req.body.comment;
  const bug_id = req.body.bug_id;
  console.log(bug_id);
  console.log(comment);

  console.log(req.body)
  var myobj = {
    "_id":  bug_id

    
  };
  var newvalues = {$set: {"comment":comment}};

  futdb.collection("bugreport").updateOne(myobj,newvalues, function(err,results){
    if (err) throw err;
    console.log("1 document updated");
    res.send(results);
  });
    
  });



app.get('/bugs', (req, res) => {
  
  console.log("in bugs");
  futdb.collection("bugreport").find().toArray(function(err,results) {
    if(err) throw err;
    res.send(results);
    
    
    console.log(results);
  })
 
});
  


app.post('/specificplayer/:playerid/:playername/comment', (req,res)=> {
  const playerid= req.params.playerid;
  const playername= req.params.playername;
  const comment= req.body.comment;
  const username= req.body.username;
  console.log(req.body)
  var myquery = {
    "_id": {
      "playerid": playerid,
    }
    
  };
  var newvalues = {$push: {"comment":{
                                      "username": username,
                                      "commentmessage":comment
  }
}};





  futdb.collection("player").update(myquery,newvalues, function(err,results){
    if (err) throw err;
    res.send(results);
    console.log("1 document updated");
  });

 
  
});

app.post('/totw/:playerid/rating', async function (req,res) {
  const playerid= req.params.playerid;
  const rating= req.body.rating;
  const username= req.body.username;
  console.log(req.body);
  console.log("in rating");
  console.log(playerid);
  console.log(username);

  var myquery = {
    "_id": {
      "playerid": playerid,
    },
    "userrating.username": username
    
  };

  var myquery2 = {
    "_id": {
      "playerid": playerid,
    },
    
  };

console.log(await futdb.collection("totw").countDocuments(myquery));

if(await futdb.collection("totw").count(myquery)==0)
{
  var newquery = {
    "_id": {
      "playerid": playerid,
    }
    
  };
  var newvaluespush = {$push: {"userrating":{
    "username": username,
    "rating":rating
  }
  }};

  futdb.collection("totw").updateOne(newquery,newvaluespush, function(err,results){
    if (err) throw err;
    res.send(results);
    console.log("1 document pushed");
  });

}

else 
{
  var newvalues = {$set: {"userrating.$.rating": rating}};
  let total = 0;
  var size = 0;
  
 
  
  console.log(total);
    futdb.collection("totw").updateOne(myquery,newvalues, async function(err,results){
      if (err) throw err;
      console.log(results);
      await futdb.collection("totw").find(myquery2).forEach(function(mydoc) {
        mydoc.userrating.forEach(function (y){
          let x= parseFloat(y.rating);
          if(typeof x === 'string' || x instanceof String)
        {
        console.log("rating stringmis");
        }
          total+=x;
          size++;
        })
      
      })
      console.log(size);
      console.log(total);
      var avg = total/size;
      futdb.collection("totw").updateOne(myquery2,{$set:{avg:avg}}, function(err,results){
        console.log("Avg pushed");
      })
      res.send(results);
      console.log("1 document updated");
    });
}




 
  
});

app.post('/login', (req,res)=> {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);

  

  futdb.collection("user").find(
    { _id: { username: username}, password: password }).toArray(function(err,result){
      if(err)
      {
        res.send({err: err})
      }

        if(result.length>0)
        {
          console.log("Logging in");
          res.send(result);
        }

        else{
          res.send({message: "Wrong username password combination"});
        }
    })
  /*db.query(
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
  );*/
});





app.post('/loginadmin', (req,res)=> {
  const adminusername = req.body.adminusername;
  const adminpassword = req.body.adminpassword;
  console.log(adminusername);
  futdb.collection("admin").find(
    { _id: { adminusername: adminusername}, adminpassword: adminpassword }).toArray(function(err,result){
      if(err)
      {
        res.send({err: err})
      }

        if(result.length>0)
        {
          console.log("Logging in");
          res.send(result);
        }

        else{
          res.send({message: "Wrong username password combination"});
        }
    })
  
  /*db.query(
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
  );*/
});

app.post('/createadmin', (req, res)=> {
  const adminusername = req.body.adminusername
  const adminemail = req.body.adminemail
  const adminpassword = req.body.adminpassword

  var myobj = {
    "_id": {
      "adminusername": adminusername
    },
    "adminemail": adminemail,
    "adminpassword": adminpassword
  };

  futdb.collection("user").insertOne(myobj, function(err,res) {
    if(err) throw err;
    console.log("1 document inserted");
  })
  /*db.query("INSERT INTO admin (adminusername, adminemail, adminpassword) VALUES (?,?,?)", 
  [adminusername,adminemail,adminpassword],  
  (err,result) => {
      if (err) {
          console.log(err)
      }
      else{
          res.send("Values inserted")
      }
  });*/
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
  const playerrating = req.body.playerrating
  const playernationality = req.body.playernationality

  var new_obj_id = ObjectId().toString();
  //console.log(new_obj_id);

  //var new_obj_id_2=new_obj_id.;

  var myobj = {
    "_id":{"playerid": ObjectId().toString()},
    "playername": playername,
    "playerposition": playerposition,
    "playerteam":playerteam,
    "playerrating":playerrating,
    "playernationality":playernationality
  };

  
  futdb.collection("player").insertOne(myobj, function(err,res) {
    if(err) throw err;
    console.log("1 document inserted to player collection");
  })

  /*db.query("INSERT INTO player (playerid, playername, playerposition, playerteam) VALUES (?,?,?,?)", 
  [playerid,playername,playerposition,playerteam],  
  (err,result) => {
      if (err) {
          console.log(err)
      }
      else{
          res.send("Values inserted")
      }
  });*/
});

app.get("/player", (req, res) => {
  
  console.log("in player");
  futdb.collection("player").find().toArray(function(err,results) {
    if(err) throw err;
    res.send(results);
    
    console.log(results);
  })
 
  /*db.query("SELECT * FROM player", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });*/
});



app.get("/totw/gk", (req, res) => {
  
  console.log("in totw");
  futdb.collection("totw").find({"playerposition": "goalkeeper"}).toArray(function(err,results) {
    if(err) throw err;
    res.send(results);
    
    console.log("1 document inserted");
    })
    });

  app.get("/totw/defense", (req, res) => {

    console.log("in totw");
    futdb.collection("totw").find({"playerposition": "defender"}).toArray(function(err,results) {
      if(err) throw err;
      res.send(results);
      
      console.log("1 document inserted");
      })
      });
  
  app.get("/totw/midfield", (req, res) => {

    console.log("in totw");
    futdb.collection("totw").find({"playerposition": "midfield"}).toArray(function(err,results) {
      if(err) throw err;
      res.send(results);
      
      console.log("1 document inserted");
      })
      });
  
  app.get("/totw/forward", (req, res) => {

    console.log("in totw forward");
    futdb.collection("totw").find({"playerposition": "striker"}).toArray(function(err,results) {
      if(err) throw err;
      res.send(results);
      
      console.log("1 document inserted");
      })
      });

app.get('/specificteam/:teamname', (req,res) => {
  
  const teamname=req.params.teamname
  console.log(teamname);
  console.log("in specific team");
  var myquery = {"_id":{"teamname":teamname}};

  futdb.collection("team").findOne(myquery,function(err,results) {
    if(err) throw err;
    res.send(results);
    console.log(results);
    console.log("1 document found");
  })

});

app.get('/specificplayer/:playerid/:playername', (req,res) => {
  
  const playerid=req.params.playerid
  const playername=req.params.playername
  console.log(playername);
  console.log("in specific player");
  console.log(playerid);
  var myquery = {"_id":{"playerid":playerid}};

  futdb.collection("player").findOne(myquery,function(err,results) {
    if(err) throw err;
    res.send(results);
    console.log(results);
    console.log("1 document found");
  })

});

app.get("/team", (req, res) => {
  
  console.log("in team");
  futdb.collection("team").find().toArray(function(err,results) {
    if(err) throw err;
    res.send(results);
    console.log(results);
    console.log("1 document found");
  })
 
  /*db.query("SELECT * FROM player", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });*/
});

app.get("/champteam", (req, res) => {
  
  console.log("in champteam");
  futdb.collection("championteams").find().toArray(function(err,results) {
    if(err) throw err;
    res.send(results);
    console.log(results);
    console.log("1 document found");
  })
});

app.delete('/deleteplayer/:playerid', (req,res) => {
  const playerid = req.params.playerid;
  console.log(playerid);
  futdb.collection("player").deleteOne({"_id":{"playerid":playerid}},function(err,results) {
    if(err) throw err;
    res.send(results);
    
    console.log("1 document deleted");
  })
 /* db.query("DELETE FROM player WHERE playerid = ?", playerid, (err,result) => {
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });*/
  });

app.get("/relationships/:username", getRelationships)
app.post("/relationships", addRelationship)
app.delete("/relationships/:id", deleteRelationship)


  app.use((req, res, next) => {
    // If no previous routes match the request, send back the React app.
    console.log("Not found");
    res.sendFile(__dirname + "/public/index.html"); 
  });
  
  app.listen(process.env.PORT || 3001, ()=> {
      console.log("Your server is running")
  })

  
