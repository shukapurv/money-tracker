import React from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"




export default function App() {

  const [Users, setAllUsers] = useState([]);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user = user.token;
    }
    axios
      .get("http://127.0.0.1:8000/v1/auth/all/", {
        headers: {
          Authorization: "Token " + user, //the token is a variable which holds the token
        },
      })
      .then((response) => {
        setAllUsers(response.data);
        console.log(response.data);
      });
  }, []);


  return (
    <MDBListGroup style={{ minWidth: '22rem' }} light>
      {
        Users.map((user) => <Card user={user} />)
      }


    </MDBListGroup>
  );
}
