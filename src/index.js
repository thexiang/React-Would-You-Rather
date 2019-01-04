import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import './css/bootstrap.min.css'
import './css/flatly-theme.min.css'
import './css/index.css'

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
