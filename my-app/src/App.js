import React from 'react'
import {BrowserRouter, Route , Link} from 'react-router-dom'
import Home from './Home'

import UsersList from './Users'
import ShowUser from './ShowUser'

import PostsList from './Posts'
import ShowPost from './ShowPost'


function App () {
    return (
        <BrowserRouter>
            <div>
                
                <Link to = '/' >Home</Link> |
                <Link to = '/users'>Users</Link> |
                <Link to = '/posts'>Posts</Link>
                               
                <Route path='/' component={Home} exact={true} />
                <Route path='/users' component={UsersList} exact={true} />
                <Route path='/users/:id' component={ShowUser} />

                <Route path='/posts' component={PostsList} exact={true}/>
                <Route path='/posts/:id' component={ShowPost} />

            </div>
        </BrowserRouter>
        
    )
}

export default App