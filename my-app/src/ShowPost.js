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
            <div className = "p-3 mb-2 bg-transparent text-dark">
                <h1 className="text-light bg-dark">Username: {this.state.username}</h1>
                <h1 className = "text-primary">TITLE: {this.state.post.title}</h1>

                <h3 className = "font-italic">BODY: {this.state.post.body}</h3> 
                 <hr></hr>

                 <h1 className="font-weight-normal">Comments</h1>
                 <ul>
                     {
                         this.state.comments.map(comment => {
                             return <li key={comment._id} className = "font-italic text-info">{comment.body}</li>
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