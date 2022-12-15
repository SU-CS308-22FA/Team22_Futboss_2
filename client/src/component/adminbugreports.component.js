import { Form, Button, Container } from 'react-bootstrap';
import Axios from 'axios';
import React, { useContext, useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Bugs() {
    const [bugList, setBugList] = useState([]);
    const { adminusername } = useParams();
    const [comment,setComment] = useState("");
   /* const getBugs = () => {
        console.log(`${process.env.REACT_APP_API_URL}/bugs`)
        Axios.get(`${process.env.REACT_APP_API_URL}/bugs`,).then((response) => {setBugList(response.data);});
    };*/

    const getBugs = () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/bugs`).then((response) => {
          setBugList(response.data);
        });
      };

    const bugComment = (bug_id) => {
    console.log(comment);
    Axios.post(`${process.env.REACT_APP_API_URL}/bugcomment`, {
        comment: comment,
        adminusername:adminusername,
        bug_id:bug_id
    }).then(() => {
        console.log("selam");
        getBugs();
    });
    };

    useEffect(() => {
        getBugs();
      }, []);
     
    return(
        <div className="bugs">
        {bugList.map((val, key) => {
          return (
            <div className="bugreport">
              <div>
               <Container>
                <h2>Subject:{val.subject}</h2>
                <h3>Name:{val.name}</h3>
                <h3>Email:{val.email}</h3>
                <text>Message:{val.message}</text>
                <br></br>
                <text>Comment:{val.comment}</text>
                <br></br>
                <input type="text" placeholder="Comment..."
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}></input>
                    <button onClick={() => {
                        bugComment(val._id);
                    }}>Submit</button>
                </Container>

              </div>
              <div>

              </div>
             
            </div>
          );
        })}
      </div>


    );
}