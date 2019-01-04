import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Panel, Image, Jumbotron,Table} from 'react-bootstrap'

class Question extends Component {
    render() {
        const {question, questionAuthor, isAnswered} = this.props
        const questionLink = `/questions/${question.id}`
        return (
            <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3">
                    {questionAuthor.name} {isAnswered ? 'asked:' : 'asks:'}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                <Table striped bordered condensed hover>
                    <tbody>
                      <tr>
                        <td align = "center"><Image circle className="avatar" src={questionAuthor.avatarURL} /></td>
                        <td>
                          <Jumbotron>
                          <h4>Would you rather...</h4>
                          <h5>
                            {"... "+ LCS(question.optionOne.text,question.optionTwo.text) + " ..."}
                          </h5>
                          <p>
                              <Link className="btn btn-info" to={questionLink}>
                                {isAnswered ? answeredBtn() : unAnsweredBtn()}
                              </Link>
                          </p>
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

const unAnsweredBtn = () => (
  <span>Answer Question</span>
)

const answeredBtn = () => (
  <span>View Results</span>
)

/* find longest common substring */
function LCS(string1, string2) {
  console.log(string1 + " " + string2)

	var comparsions = []; //2D array for the char comparsions ...
	var maxSubStrLength = 0;
	var lastMaxSubStrIndex = -1, i, j, char1, char2, startIndex;

	for (i = 0; i < string1.length; ++i) {
    // eslint-disable-next-line
		comparsions[i] = new Array();

		for (j = 0; j < string2.length; ++j) {
			char1 = string1.charAt(i);
			char2 = string2.charAt(j);

			if (char1 === char2) {
				if (i > 0 && j > 0) {
					comparsions[i][j] = comparsions[i - 1][j - 1] + 1;
				} else {
					comparsions[i][j] = 1;
				}
			} else {
				comparsions[i][j] = 0;
			}

			if (comparsions[i][j] > maxSubStrLength) {
				maxSubStrLength = comparsions[i][j];
				lastMaxSubStrIndex = i;
			}
		}
	}

	if (maxSubStrLength > 0) {
		startIndex = lastMaxSubStrIndex - maxSubStrLength + 1;

		return string1.substr(startIndex, maxSubStrLength);
	}

	return null;
}






function mapStateToProps({questions, authedUser, users}, {id}) {
    return {
        question: questions[id],
        questionAuthor: users[questions[id].author]
    }

}

export default connect(mapStateToProps)(Question)
