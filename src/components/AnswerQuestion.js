import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../actions/questions'
import {  Panel, Image, ListGroup, ListGroupItem,
  FormGroup, Radio, Button,  Table, Jumbotron, ProgressBar ,Label } from 'react-bootstrap'



class AnswerQuestion extends Component {


state = {
  selection: null
}

    handleSubmit = (e) => {
      e.preventDefault()
      const { dispatch, question } = this.props
      const answer = this.state.selection

      //console.log(answer)

      if (answer) {
        dispatch(handleAnswerQuestion(question.id, answer))
        }

      }


    handleChange = (e) => {
      this.setState({
        selection: e.target.value
      })
    }





    beforeAnswer = () => {
        const { question, author ,questionAuthor } = this.props

        return (
          <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  {author.name} asks:
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
              <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td align = "center"><Image circle className="avatar" src={questionAuthor.avatarURL} /></td>
                      <td>
                        <Jumbotron>
                        <h5>Would you rather...</h5>
                        <form onSubmit={this.handleSubmit} >
                          <FormGroup>
                            <ListGroup>
                              <ListGroupItem>
                                <Radio
                                  onChange={this.handleChange}
                                  name="opts"
                                  value="optionOne"
                                  inline>
                                  {question.optionOne.text}
                                </Radio>
                              </ListGroupItem>
                              <ListGroupItem>
                                <Radio
                                  onChange={this.handleChange}
                                  name="opts"
                                  value="optionTwo"
                                  inline>
                                  {question.optionTwo.text}
                                </Radio>
                              </ListGroupItem>
                            </ListGroup>
                          </FormGroup>
                          <Button  type="submit" bsStyle="info">
                            <span>Submit</span>
                          </Button>
                        </form>
                        </Jumbotron>
                      </td>
            </tr>
          </tbody>
        </Table>
              </Panel.Body>
            </Panel>




        )
      }


afterAnswer = () => {
    const { question, author , numOfOne,  numOfTwo , total, percentageOne, percentageTwo, questionAuthor ,isAnsweredOne,isAnsweredTwo} = this.props

  return (
    <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            {author.name} asks:
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
        <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <td align = "center"><Image circle className="avatar" src={questionAuthor.avatarURL} /></td>
                <td>
                  <Jumbotron>
                  <h4>Reuslt</h4>
                      <ListGroup>
                        <ListGroupItem bsStyle={isAnsweredOne ? 'info' : null}>
                        {isAnsweredOne
                         ?   <h4>
                                <Label>Your Vote</Label>
                            </h4>
                         : null}
                        {question.optionOne.text}
                        <br/>
                        {numOfOne} out of {total} votes
                        <ProgressBar now={percentageOne} label={`${percentageOne}%`} />
                        </ListGroupItem>


                        <ListGroupItem bsStyle={isAnsweredTwo ? 'info' : null}>
                        {isAnsweredTwo
                          ?   <h4>
                                 <Label>Your Vote</Label>
                             </h4>
                         : null}
                        {question.optionTwo.text}
                        <br/>
                        {numOfTwo} out of {total} votes
                        <ProgressBar now={percentageTwo} label={`${percentageTwo}%`} />

                        </ListGroupItem>
                      </ListGroup>

                  </Jumbotron>
                </td>
      </tr>
    </tbody>
  </Table>
        </Panel.Body>
      </Panel>

  )
}




    render() {
        const { question ,isAnsweredOne , isAnsweredTwo} = this.props
        console.log(question)

        return (

          isAnsweredOne || isAnsweredTwo ? this.afterAnswer() : this.beforeAnswer()
        )
    }
}

function mapStateToProps({questions, users, authedUser}, props) {
    const {question_id} = props.match.params
    const question = questions[question_id]
    const questionAuthor = users[question.author]
    const author = users[authedUser]
    const isAnsweredOne = question.optionOne.votes.includes(authedUser)
    const isAnsweredTwo = question.optionTwo.votes.includes(authedUser)

    const numOfOne = question.optionOne.votes.length
    const numOfTwo = question.optionTwo.votes.length
    const total = numOfOne + numOfTwo
    const percentageOne = (numOfOne / total) * 100
    const percentageTwo = (numOfTwo / total) * 100

    return {
        question,
        questionAuthor,
        authedUser,
        author,
        isAnsweredOne,
        isAnsweredTwo,
        numOfOne,
        numOfTwo ,
        total,
        percentageOne,
        percentageTwo
    }
}

export default connect(mapStateToProps)(AnswerQuestion)
