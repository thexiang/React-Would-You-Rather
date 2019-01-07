import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Button, Form, FormGroup, Panel, Image} from 'react-bootstrap'
import {authenticateUser} from "../actions/authedUser"
import {Redirect} from 'react-router-dom'
import logo from '../image/100x100-logo.jpg'

class Login extends Component {
    state = {
        username: '',
        isLoggedIn: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username} = this.state
        const {dispatch} = this.props

        if (username !== "") {
            dispatch(authenticateUser(username))
            this.setState(() => ({isLoggedIn: true}))
        }
    }

    handleChange = (e) => {
        const username = e.target.value
        this.setState(() => ({username}))
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}

        const {isLoggedIn} = this.state

        if (isLoggedIn) {
            return <Redirect to={from} />
        }


        return (
      <Panel bsStyle="primary" className = "signin-panel">
        <Panel.Heading>
          <Panel.Title className = "signin-heading">

          <h4>Welcome to the Would You Rather App!</h4>
          <h5>Please Sign in to continue</h5>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body className="signin">

            <Form onSubmit={this.handleSubmit} className="form-signin">
            <Image  className="logo" src={logo} />
                <h4>Sign In </h4>
                <FormGroup>

                    <select id="username" className="form-control"
                            value={this.state.username}
                            onChange={this.handleChange}>
                        <option value='' disabled>Select User</option>
                        {this.props.users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        )}
                    </select>

                </FormGroup>
                <Button type="submit"
                        className="btn btn-lg btn-primary btn-block">Login</Button>

            </Form>

        </Panel.Body>
    </Panel>


        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users: Object.values(users).map((user) => {
            return ({
                id: user.id,
                name: user.name
            })
        }),
        username: authedUser
    }
}

export default connect(mapStateToProps)(Login)
