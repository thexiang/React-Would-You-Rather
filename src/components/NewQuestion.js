import React, {Component} from 'react'
//import {Button, Form, FormGroup, Input, Label} from 'reactstrap'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {   ListGroup, ListGroupItem,
  FormGroup, Button,  FormControl } from 'react-bootstrap'

import {handleAddQuestion} from "../actions/questions"

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toDashboard: false
    }

    handleChange = (e) => {
      const optionText = e.target.id
      const text = e.target.value

      this.setState(() => ({
        [optionText]: text
      }))


      //console.log(this.state)
        }

    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOneText, optionTwoText} = this.state
        const {dispatch} = this.props

        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toDashboard: true
        }))
    }



    render() {
        const {optionOneText, optionTwoText, toDashboard} = this.state

        if (toDashboard === true) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <h1>Would You Rather...</h1>

                    <form onSubmit={this.handleSubmit} >
                      <FormGroup>
                        <ListGroup>
                          <ListGroupItem>
                          <FormGroup>
                          <FormControl
                                id="optionOneText"
                                type="text"
                                placeholder="Enter First Option Here"
                                onChange={this.handleChange}/>
                            </FormGroup>
                            <h5>OR</h5>
                            <FormGroup>
                              <FormControl
                                id="optionTwoText"
                                type="text"
                                placeholder="Enter Second Option Here"
                                onChange={this.handleChange}/>
                            </FormGroup>
                          </ListGroupItem>
                        </ListGroup>
                      </FormGroup>
                      <Button type="submit"
                          disabled={optionOneText === '' && optionTwoText === ''}>Add Question
                    </Button>
                    </form>


            </div>
        )
    }
}

export default connect()(NewQuestion)
