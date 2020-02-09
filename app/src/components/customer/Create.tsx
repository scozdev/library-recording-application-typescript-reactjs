import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    kitapAdi: string,
    kitapYazar: string,
    yayinevi: string,
    cikisTarihi: string
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            kitapAdi: '',
            kitapYazar: '',
            yayinevi: '',
            cikisTarihi: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            kitapAdi: this.state.kitapAdi,
            kitapYazar: this.state.kitapYazar,
            yayinevi: this.state.yayinevi,
            cikisTarihi: this.state.cikisTarihi
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:5000/kitaplar`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Post </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Veri kaydet
                    </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Json olarak kaydedildi.
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="kitapAdi"> Kitap Adi </label>
                            <input type="text" id="kitapAdi" onChange={(e) => this.handleInputChanges(e)} name="kitapAdi" className="form-control" placeholder="Kitap adi" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="kitapYazar"> Yazar Adi </label>
                            <input type="text" id="kitapYazar" onChange={(e) => this.handleInputChanges(e)} name="kitapYazar" className="form-control" placeholder="Yazar adi" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="yayinevi"> Yayinevi </label>
                            <input type="yayinevi" id="yayinevi" onChange={(e) => this.handleInputChanges(e)} name="yayinevi" className="form-control" placeholder="Yayinevi" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="cikisTarihi"> Cikis Tarihi </label>
                            <input type="text" id="cikisTarihi" onChange={(e) => this.handleInputChanges(e)} name="cikisTarihi" className="form-control" placeholder="Cikis tarihi ornek : (01/01/2020)" />
                        </div>


                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Kaydet
              </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)
