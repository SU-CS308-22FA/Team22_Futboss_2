import React, {Component, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import deleteUser from './login.component';
import getUser from './login.component';

export default function ProfilePage () {
    let {username} = useParams();
    window.scrollTo(0, 0)
    return(
        <div>
        <div>{username}</div>
        <Link to="/"><button onClick={() => {deleteUser(username)}}>Delete</button></Link>
        </div>
    )
}