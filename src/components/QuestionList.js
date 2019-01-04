
import React from 'react'
import Question from './Question'

const QuestionList = props => {
  const {questionIDList, isAnswered} = props
  const questionIDs = Object.values(questionIDList)
    .sort((a, b) => b.timestamp - a.timestamp).map((question) => question.id)

  return (
    <div>
      {questionIDs.map((id) => (
        <Question key={id} id={id} isAnswered={isAnswered} />
      ))}
    </div>
  )
}

export default QuestionList;

//Todo use question state to identify answered or not
