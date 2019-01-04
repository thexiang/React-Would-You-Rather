import React, {Component} from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import {connect} from 'react-redux'
import QuestionList from './QuestionList'

class Dashboard extends Component {

    render() {

        const {unAnswered,answered} = this.props
        return (
            <Tabs defaultActiveKey={1} id="main-page-tab">
              <Tab eventKey={1} title="Unanswered Questions" >
                  <QuestionList questionIDList={unAnswered} isAnswered={false} />
              </Tab>
              <Tab eventKey={2} title="Answered Questions">
                  <QuestionList questionIDList={answered} isAnswered={true} />
              </Tab>
              </Tabs>

        )
    }
}

function mapStateToProps({questions, authedUser}) {

    const unAnswered = Object.values(questions).filter((question) =>
        !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))

    const answered = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    )

    return {
        unAnswered,
        answered
    }
}

export default connect(mapStateToProps)(Dashboard)
