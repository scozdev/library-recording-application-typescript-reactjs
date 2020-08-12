import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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

class EditBook extends React.Component<RouteComponentProps<any>, IFormState> {
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

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/kitaplar/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.book &&
                    <div>
                        < h1 > Edit</h1>

                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Book </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Kitap kaydedildi</div>
                                )}

                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="kitapAdi"> Kitap Adi </label>
                                        <input type="text" id="kitapAdi" defaultValue={this.state.book.kitapAdi} onChange={(e) => this.handleInputChanges(e)} name="kitapAdi" className="form-control" placeholder="Kitap adi" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="kitapYazar"> Kitap Yazari </label>
                                        <input type="text" id="kitapYazar" defaultValue={this.state.book.kitapYazar} onChange={(e) => this.handleInputChanges(e)} name="kitapYazar" className="form-control" placeholder="Yazar adi" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="yayinevi"> Yayinevi </label>
                                        <input type="yayinevi" id="yayinevi" defaultValue={this.state.book.yayinevi} onChange={(e) => this.handleInputChanges(e)} name="yayinevi" className="form-control" placeholder="Yatinevi" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="cikisTarihi"> Cikis Tarihi </label>
                                        <input type="text" id="cikisTarihi" defaultValue={this.state.book.cikisTarihi} onChange={(e) => this.handleInputChanges(e)} name="cikisTarihi" className="form-control" placeholder="Cikis tarihi ornek : (01/01/2020)" />
                                    </div>


                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Book </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditBook)
