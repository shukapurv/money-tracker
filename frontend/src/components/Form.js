import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom'


import axios from 'axios';

const initialState = {
    "name": "",
    "description": "",
    "amount": 0.00,
    "category": "",
    "users": [],
}

function FormDisabledInputExample() {
    const navigate = useNavigate()
    const [cat, setCat] = useState([])
    const [type, setType] = useState("Electricity")
    const [all, setAll] = useState([])
    const [users, setUsers] = useState([])
    const [con, setCon] = useState(false)
    const [c, setC] = useState([]);
    const [state, setState] = useState(initialState)

    useEffect(() => {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            user = user.token;
        }
        axios
            .get("http://127.0.0.1:8000/v1/category/", {
                headers: {
                    Authorization: "Token " + user, //the token is a variable which holds the token
                },
            })
            .then((response) => {
                setCat(response.data.category);
                console.log(response.data, "aaa");
            });

        axios
            .get("http://127.0.0.1:8000/v1/auth/all/", {
                headers: {
                    Authorization: "Token " + user, //the token is a variable which holds the token
                },
            })
            .then((response) => {
                setAll(response.data)
                all.map((item) => {
                    setC({ ...c, [item.id]: false });
                });
            });


    }, []);


    const handleChange = (e) => {
        setC({ ...c, [e.target.name]: e.target.checked });
    };



    const onSubmit = (e) => {






        cat.map((a) => {
            if (type.trim() === a.name.trim()) {
                setState({ ...state, ["category"]: a.id })
            }
        })
        console.log(c)
        state["users"] = []
        all.map((a) => {
            if (c[a.id]) {
                state["users"].push(a.id)
            }
        })



        console.log(state)

        var user = JSON.parse(localStorage.getItem("user"));



        axios
            .post("http://127.0.0.1:8000/v1/transaction/", { ...state }, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: "Token " + user.token, //the token is a variable which holds the token
                },


            })
            .then((response) => {
                console.log("success")
                navigate("/transactions")
            }).catch((error) => { console.error(error); setCon(true) });
    }

    return (
        <form onSubmit={() => onSubmit()}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Name" value={state["name"]}
                    onChange={e => setState({ ...state, ["name"]: e.target.value })} />
            </Form.Group>
            <InputGroup>
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control as="textarea" aria-label="Description" value={state["description"]}
                    onChange={e => setState({ ...state, ["description"]: e.target.value })} />
            </InputGroup>
            <Form.Group>
                <InputGroup className="mb-3 mt-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputGroup.Text>Amount</InputGroup.Text>
                    <Form.Control aria-label="Amount" value={state["amount"]}
                        onChange={e => setState({ ...state, ["amount"]: e.target.value })} />
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    as="select"
                    value={type}
                    onChange={e => {
                        setType(e.target.value);
                        console.log(e.target);
                    }}
                >
                    {
                        cat.map((c) => {
                            return (
                                <option >

                                    {c.name}</option>
                            )
                        })
                    }

                </Form.Select>
            </Form.Group>
            <Form.Group>
                <h4>Add Users</h4>
                {
                    all.map((a) => {
                        return (
                            <Form.Check inline id="switch1" className="pl-5">
                                <Form.Check.Input
                                    checked={c[a.id]}
                                    onChange={handleChange}
                                    name={a.id}
                                />
                                <Form.Check.Label>{a.username}</Form.Check.Label>
                            </Form.Check>

                        )
                    })
                }
            </Form.Group>
            <Button variant="primary" onClick={() => onSubmit()}>
                Submit
            </Button>
            {
                con ? <Alert variant="danger">
                    Please Try again!!
                </Alert> : ""
            }
        </form >
    );
}

export default FormDisabledInputExample;