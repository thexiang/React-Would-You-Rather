import React, {Component} from 'react'

import {connect} from 'react-redux'
import { Panel, Image, Jumbotron,Table} from 'react-bootstrap'

class UserDetail extends Component {
    render() {
        const {user} = this.props
        const numberOfAsked = user.questions.length
        const numberOfAnswered = Object.keys(user.answers).length
        return (
          <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  {user.name}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
              <Table striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td align = "center"><Image circle className="avatar" src={user.avatarURL} /></td>
                      <td>
                        <Jumbotron>
                        <Table responsive>
                      <tbody>
                        <tr>
                          <td>Answered questions</td>
                          <td>{numberOfAnswered}</td>
                        </tr>
                        <tr>
                          <td>Created question</td>
                          <td>{numberOfAsked}</td>

                        </tr>
                        <tr>
                          <td>  <b> Score </b></td>
                          <td>  <b> {numberOfAsked + numberOfAnswered} </b></td>

                        </tr>
                      </tbody>
                    </Table>
                        </Jumbotron>
                      </td>
            </tr>
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>
        )
    }
}

function mapStateToProps({users}, {id}) {
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(UserDetail)
