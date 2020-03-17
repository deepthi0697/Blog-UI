import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class PostsList extends React.Component {
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            const posts = response.data
            this.setState({posts})
        })
        .catch((err) => {
            alert(err)
        })
    } 
    render() {
        return (
            <div>
                <h1 className = "text-monospace font-italic text-light bg-dark">Total Posts - {this.state.posts.length}</h1>
                <ul>
                    {
                        this.state.posts.map(post => {
                            return <li key={post._id} className = "font-italic"> <Link to = {`/posts/${post.id}`}>{post.title}</Link></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default PostsList