import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { adminContext } from "../store/context";
import Axios from "axios";

export default function AdminProfilePage() {
  const { admin } = useContext(adminContext);
  const { adminusername } = useParams();

  window.scrollTo(0, 0);
  return (
    <div>
       <p1>Hello</p1>
    </div>
  );
}
