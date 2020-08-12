import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/customer/Create';
import EditCustomer from './components/customer/Edit';
import { Button, Container, Row, Col, Fade, Input } from 'reactstrap';
import Search from './components/customer/Search';
import Failed from './components/Failed';
import Search2 from './components/Search2';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>

        <Container>
          <nav>

            <ul>
              <li>
                <Link to={'/'}> Home </Link>
              </li>

              <li>
                <Link to={'/create'}> Create </Link>
              </li>

            </ul>



          </nav>

          <br></br>

    

          <Switch>

            <Route path={'/'} exact component={Home} />



            <Route path={'/create'} exact component={Create} />

            <Route path={'/edit/:id'} exact component={EditCustomer} />

            <Route path={'/detail/:id'} exact component={Search} />


            <Route exact component={Failed} />
          </Switch>







        </Container>
      </div>
    );
  }
}

export default withRouter(App);
