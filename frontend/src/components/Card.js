import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function App({ user, test }) {
    const [added, setAdded] = useState(user.connected)
    var user1 = JSON.parse(localStorage.getItem("user"));
    if (user1) {
        user1 = user1.token;
    }
    const add = () => {
        axios
            .post("http://127.0.0.1:8000/v1/connections/friends/add_friend/", {
                headers: {
                    Authorization: "Token " + user1, //the token is a variable which holds the token
                },
                body: {
                    "to_user": user.username,
                    "message": "string"
                }
            })
            .then((response) => {
                setAdded(true)
            });
    }

    const remove = () => {
        axios
            .delete("http://127.0.0.1:8000/v1/connections/friends/" + user.id, {
                headers: {
                    Authorization: "Token " + user1, //the token is a variable which holds the token
                },
            })
            .then((response) => {
                setAdded(false)
            });

    }
    return (

        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <img
                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                />
                <div className='ms-3'>
                    <p className='fw-bold mb-1'>{user.username}</p>
                    <p className='text-muted mb-0'>{user.email}</p>
                    {
                        test && test === user.username ? <Badge pill bg="success">
                            PAID
                        </Badge> : ""
                    }
                </div>

            </div>
            {/* {
                added ? <MDBBadge pill light color='success' onClick={() => remove()}>
                    Remove
                </MDBBadge> : <MDBBadge pill light color='warning' onClick={() => add()}>
                    Add
                </MDBBadge>
            } */}

        </MDBListGroupItem>


    );
}
