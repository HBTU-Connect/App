import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'


import Sidebar from '../profileSidebar';
import Feeds from './feeds';
import Clubs from '../clubs/clubs'


const Home = () => {
    return(
        <div className='body-container'>
            <Sidebar />
            <Switch>
                <Route to='/' exact component={Feeds} />
                <Route to='/clubs' exact component={Clubs} />
            </Switch>
        </div>
    )
}

export default withRouter(Home);