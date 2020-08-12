import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';

export interface IValues {
    icerik: string,
    veri: string
}
interface IState {
    [key: string]: any;
    books: any[];
    values: IValues[];
    icerik: any;
    veri: any;

}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { books: [], values: [], icerik: "", veri: "" }
    }


    public componentDidMount(): void {
        axios.get(`http://localhost:5000/kitaplar`).then(data => {
            this.setState({ books: data.data })
        })
    }

    public deleteBook(id: number) {
        axios.delete(`http://localhost:5000/kitaplar/${id}`).then(data => {
            const index = this.state.books.findIndex(book => book.id === id);
            this.state.books.splice(index, 1);
            this.props.history.push('/');
        })
    }



    handleSubmmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        axios.get(`http://localhost:5000/kitaplar/?${this.state.icerik}=${this.state.veri}`).then(data => {
            this.setState({ books: data.data });
            console.log(this.state.books)
        })



    };


    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const books = this.state.books;
        return (
            <div>



                <div>
                    <Form onSubmit={this.handleSubmmit}>


                        <Row>
                            <Col>  <Label for="icerik">Arama İçeriği</Label>
                                <Input
                                    type="select"
                                    name="icerik"
                                    id="icerik"
                                    onChange={(e) => this.handleInputChanges(e)}
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
                                    onChange={(e) => this.handleInputChanges(e)}
                                ></Input></Col>

                        </Row>
                        <Button type="submit">Ara</Button>

                    </Form>


                </div>




                {books.length === 0 && (
                    <div className="text-center">
                        <h2>No book found at the moment</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Kitap</th>
                                    <th scope="col">Yazar</th>
                                    <th scope="col">Yayinevi</th>
                                    <th scope="col">Cikis Tarihi</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {books && books.map(book =>
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.kitapAdi}</td>
                                        <td>{book.kitapYazar}</td>
                                        <td>{book.yayinevi}</td>
                                        <td>{book.cikisTarihi}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${book.id}`} className="btn btn-sm btn-outline-secondary">Edit Book </Link>
                                                    <Link to={`detail/${book.id}`} className="btn btn-sm btn-outline-secondary">Detail Book </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteBook(book.id)}>Delete Book</button>

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
