import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card1 from "./Card1"
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack';



const Transaction = () => {
    const [all, setAll] = useState([])
    const [relation, setRelation] = useState([])
    const [type, setType] = useState("all")
    const [cat, setCat] = useState([])
    const [temp, setTemp] = useState([])


    useEffect(() => {
        console.log(type)


        if (type === "All") {
            setAll(temp)
        } else {
            setAll(temp.filter((i) => { return type === i.category.name }))
        }
    }, [type])

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
                response.data.category.unshift({ "name": "All" })
                setCat(response.data.category);
                console.log(response.data, "aaa");
            });

        axios
            .get("http://127.0.0.1:8000/v1/transaction/", {
                headers: {
                    Authorization: "Token " + user, //the token is a variable which holds the token
                },
            })
            .then((response) => {
                console.log(response.data)
                setAll(response.data)
                setTemp(response.data)
            });

        axios
            .get("http://127.0.0.1:8000/v1/transaction/relation/", {
                headers: {
                    Authorization: "Token " + user, //the token is a variable which holds the token
                },
            })
            .then((response) => {
                setRelation(response)
            });

    }, []);
    return (

        <header style={{ alignContent: "center", justifyContent: "center" }}>
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1">
                    Transactions
                </ListGroup.Item>

            </ListGroup>
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
            <div class=" justify-content-center">


                    {
                        all.map((a) => {
                            return (<Card1 transaction={a} />)
                        })
                    }

        
            </div>




        </header>
    )
}

export default Transaction