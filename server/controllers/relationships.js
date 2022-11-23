import { db } from "../index.js";


export const getRelationships = (req,res)=>{
    const q = "SELECT * FROM relationships WHERE followerUsername = ?";

    db.query(q, [req.params.username], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send(data);//data.map(relationship=>({followerUsername: relationship.followerUsername, playerId: relationship.followedPlayerID})));
    });
}

export const addRelationship = (req, res) => {

    const q = "INSERT INTO relationships (`followerUsername`,`followedPlayerId`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.playerId
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
};

export const deleteRelationship = (req, res) => {

    const q = "DELETE FROM relationships WHERE `id` = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
};