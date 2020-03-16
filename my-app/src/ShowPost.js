import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowPost extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            post: {},
            comments: []
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => {
            const post = response.data
            const userId = post.userId
            this.setState({post})
            
            axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => {
                const username = response.data.name
                this.setState({username})
            })

            const postId = post.id
            axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then((response) => {
                const comments = response.data
                this.setState({comments})
            })
        })

        .catch((err) => {
            alert(err)
        })
        
    }
    render() {
        return (
            <div>
                <h1>Username: {this.state.username}</h1>
                <h1>TITLE: {this.state.post.title}</h1>

                <h3>BODY: {this.state.post.body}</h3> 
                 <hr></hr>

                 <h1>Comments</h1>
                 <ul>
                     {
                         this.state.comments.map(comment => {
                             return <li key={comment._id}>{comment.body}</li>
                         })
                     }
                 </ul>

                 <hr></hr>

                 <p><Link to = {`/users/${this.state.post.userId}`}>More posts written by the author: {this.state.username}</Link></p>
                
            </div>
        )
    }
}

export default ShowPost