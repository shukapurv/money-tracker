import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'



function FormDisabledInputExample() {
    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()

    const initialState = {
        "name": "",
        "description": "",
        "amount": 0.00,
        "category": 0,
    }


    const [cat, setCat] = useState([])
    const [type, setType] = useState("Electricity")
    const [all, setAll] = useState([])
    const [c, setC] = useState([]);
    const [state, setState] = useState(initialState)
    const [transaction, setTransaction] = useState({})

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
            .get("http://127.0.0.1:8000/v1/transaction/" + { id } + "/", {
                headers: {
                    Authorization: "Token " + user, //the token is a variable which holds the token
                },
            })
            .then((response) => {
                setTransaction(response.data)
            });





    }, []);



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
            .patch("http://127.0.0.1:8000/v1/transaction/" + id + "/", { ...state }, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: "Token " + user.token, //the token is a variable which holds the token
                },


            })
            .then((response) => {
                console.log("success")
                navigate("/transactions")
            }).catch((error) => { console.error(error) });
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

            {/* <Form.Group className="mb-3">
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
            </Form.Group> */}

            <Button variant="primary" onClick={() => onSubmit()}>
                Submit
            </Button>
        </form >
    );
}

export default FormDisabledInputExample;