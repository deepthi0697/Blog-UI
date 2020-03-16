import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


class ShowUser extends React.Component {
    constructor(){
        super()
        this.state = {
            user: {},
            posts: []
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        
        axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)
        .then((response)=>{
            const user = response.data
            this.setState({user})
        })
        .catch((err)=>{
            alert(err)
        })

        axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((response)=>{
            const posts = response.data
            this.setState({posts})
        })
        .catch((err)=>{
            alert(err)
        })
    }

    render(){
        return (
            <div>
                <h1>Username: {this.state.user.name}</h1>
                <h1>Posts written by the user</h1>
                <ul>
                {
                    this.state.posts.map(post => {
                        return <li key={post._id}><Link to = {`/posts/${post.id}`}>{post.title}</Link></li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default ShowUser