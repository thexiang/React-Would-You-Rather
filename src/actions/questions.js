import {hideLoading, showLoading} from 'react-redux-loading'
import {saveQuestion, saveQuestionAnswer} from "../utils/api"
import {updateData} from "./shared";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }

}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())

        //console.log("Action question: " + optionOneText + " " + optionTwoText)
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then(() => {
                dispatch(updateData())
                dispatch(hideLoading())
            })
    }
}

export function handleAnswerQuestion(questionID, answer) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return saveQuestionAnswer(authedUser, questionID, answer)
            .then(() => {
                dispatch(updateData())
                dispatch(hideLoading())
            })
    }

}
