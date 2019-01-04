import React, {Component} from 'react'
import {connect} from 'react-redux'

import UserDetail from './UserDetail'

class Leaderboard extends Component {
    render() {
        const {users} = this.props
        return (
            <div>
                <h1>Leaderboard</h1>
                {users.map((userId) =>
                    <UserDetail key={userId} id={userId}/>
                )}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.keys(users)
            .sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
    }
}

export default connect(mapStateToProps)(Leaderboard)
