import React, {Component, Fragment} from 'react';
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared"
import Leaderboard from "./Leaderboard"
import AnswerQuestion from './AnswerQuestion'
import Dashboard from "./Dashboard";
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import NewQuestion from './NewQuestion'




class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
      
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.loading === true
                        ? null
                        : <div>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/" exact component={Dashboard}/>
                            <PrivateRoute path="/leaderboard" component={Leaderboard}/>
                            <PrivateRoute path="/add" component={NewQuestion}/>
                            <PrivateRoute path="/questions/:question_id" component={AnswerQuestion}/>
                        </div>}
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({questions, users}) {
    return {
        loading: Object.keys(questions).length === 0 || Object.keys(users).length === 0
    }
}

export default connect(mapStateToProps)(App);
