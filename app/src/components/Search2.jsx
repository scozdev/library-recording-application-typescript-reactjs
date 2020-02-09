import React, { Component } from "react";
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';

export default class Search2 extends Component {
    state = { icerik: "", veri: "", description: "",book :"asdsad"};
    
    handleChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    };

    handleSubmmit = e => {
       e.preventDefault();

        axios.get(`http://localhost:5000/kitaplar/?${this.state.icerik}=${this.state.veri}`).then(data => {
            this.setState({ book: data.data });
      
        })
    


    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmmit}>


                    <Row>
                        <Col>  <Label for="icerik">Arama İçeriği</Label>
                            <Input
                                type="select"
                                name="icerik"
                                id="icerik"
                                onChange={this.handleChange}
                            >
                                <option>kitapAdi</option>
                                <option>kitapYazar</option>
                                <option>yayinevi</option>
                            </Input>
                        </Col>
                        <Col>  <Label for="veri">Veri </Label>
                            <Input
                                type="text"
                                name="veri"
                                id="veri"
                                placeholder="Aradığın içerikle ilgili veri gir : "
                                onChange={this.handleChange}
                            ></Input></Col>

                    </Row>
                    <Button type="Ara">Ara</Button>

                </Form>

                <div>
                    <p> {this.state.icerik} {this.state.veri}  </p>
                </div>
            </div>
        );
    }
}
