import * as React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import axios from 'axios';


export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    book: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class SearchBook extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            book: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/kitaplar/${this.state.id}`).then(data => {
            this.setState({ book: data.data });
        })
    }


   

    public render() {

        return (
            <div>


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
                                <tr key={this.state.book.id}>
                                    <td>{this.state.book.id}</td>
                                    <td>{this.state.book.kitapAdi}</td>
                                    <td>{this.state.book.kitapYazar}</td>
                                    <td>{this.state.book.yayinevi}</td>
                                    <td>{this.state.book.cikisTarihi}</td>
                                    <td>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }


}

export default withRouter(SearchBook)
