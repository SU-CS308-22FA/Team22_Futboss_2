
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteUser } from "./adminlogin.component";
import { userContext } from "../store/context";
import Axios from "axios";

const updateEmail = (adminusername, adminemail) => {
    Axios.put(`${process.env.REACT_APP_API_URL}/adminupdate`, {
        adminusername,
        adminemail,
    }).then((response) => {
        console.log(response);
    });
};

export default function AdminProfilePage() {
    const { admin } = useContext(userContext);
    const { adminusername } = useParams();

    const [newAdminEmail, setNewAdminEmail] = useState(admin?.adminemail ?? "");
    window.scrollTo(0, 0);
    return (
        <div>
            <div>{adminusername}</div>
            <Link to="/">
                <button
                    onClick={() => {
                        deleteUser(adminusername);
                    }}
                >
                    Admin Delete
                </button>
            </Link>
            <br />
            <input
                type="text"
                placeholder="New Email"
                value={newAdminEmail}
                onChange={(event) => {
                    setNewAdminEmail(event.target.value);
                }}
            />
            <button
                onClick={() => {
                    updateEmail(adminusername, newAdminEmail);
                }}
            >
                Update
            </button>
        </div>
    );
}





