import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from 'mdb-react-ui-kit';
import Card from "./Card"
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Update from './Update'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';




export default function App({ transaction }) {
    const handleDelete = () => {
        var user1 = JSON.parse(localStorage.getItem("user"));
        if (user1) {
            user1 = user1.token;
        }
        axios.delete('http://127.0.0.1:8000/v1/transaction/' + transaction.id + "/", {
            headers: {
                Authorization: "Token " + user1, //the token is a variable which holds the token
            }
        })
            .then(() => window.location.reload());
    }
    var user = JSON.parse(localStorage.getItem("user"));
    const amt = transaction.amount / (transaction.users.length - 1)

    return (
        <MDBRow w-100>
            <MDBCol xl={12} lg={6} className="w-100">
                <MDBCard>
                    <MDBCardBody>
                        <div className='d-flex align-items-center'>
                            <img
                                src='https://img.freepik.com/premium-vector/bag-money-logo-template-sack-money-vector-illustration_23987-343.jpg?w=2000'
                                alt=''
                                style={{ width: '45px', height: '45px' }}
                                className='rounded-circle'
                            />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{transaction.name}</p>
                                <p className='text-muted mb-0'>Date: {transaction.date}</p>
                                <p className='text-muted mb-0'>Amount: {transaction.amount}</p>
                                <p className='text-muted mb-0'>Description: {transaction.description}</p>
                                <p className='text-muted mb-0'>Category: {transaction.category.name}</p>
                            </div>

                        </div>
                        <Link to={'/update/' + transaction.id}>
                            <Button variant="outline-dark">Update</Button>
                        </Link>

                    </MDBCardBody>
                    <Button variant="secondary" size="lg">
                        All users involved
                    </Button>
                    <span className='ms-3'>
                        {
                            transaction.users.map((u) => <Card user={u} test={transaction.created_by.username} />)
                        }
                    </span>
                    {
                        transaction.created_by.username == user.username ?
                            <Badge pill mb={2} bg="success">
                                You receive {amt} from each person
                            </Badge>
                            : <Badge pill mb={2} bg="danger">
                                You owe {amt} to user {transaction.created_by.username}
                            </Badge>}
                    <Button variant="primary" onClick={() => handleDelete()}>Delete Transaction</Button>
                </MDBCard>
            </MDBCol>

        </MDBRow>
    );
}