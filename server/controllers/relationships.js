import { futdb } from "../index.js";


export const getRelationships = async (req, res) => {

  try {
    const result = await futdb.collection('user').findOne({ _id: { username: req.params.username } });

    if (result?.following) {
      const playerids = result.following.map((item) => item.playerid)
      const players = await futdb.collection('player').find({ "_id.playerid": { $in: playerids }  }).toArray();
      
      console.log(players)
      res.send(players)
      return
    }
    res.send([])
  } catch (e) {
    res.send(e);
  }
}

export const addRelationship = async (req, res) => {
  const { username, playerId } = req.body
  var myquery = { "_id": { "username": username } };
  var newvalues = {
    $push: {
      following: { playerid: playerId }
    }
  };

  try {
    await futdb.collection('user').updateOne(myquery, newvalues)
    res.send();
  } catch (e) {
    res.send(e);
  }

};

export const deleteRelationship = async (req, res) => {
  const { username, playerid } = req.body;
  var myquery = { "_id": { "username": username } };
  var newvalues = {
    $pull: {
      following: { playerid }
    }
  };
  try {
    await futdb.collection('user').updateOne(myquery, newvalues);
    res.send()
  } catch (e) {
    res.send(e);
  }
};