import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


//components
import Header from './header';
import WelcomePage from './welcome/welcome';
import SignUpForm from './auth/signUpForm';
import LoginForm from './auth/loginForm';
import JoinUsPage from './auth/joinUsPage';
import Feeds from './userPages/feeds/feeds';
import Sidebar from './userPages/profileSidebar';
import Clubs from './userPages/clubs/clubs';
import Home from './userPages/feeds/home'
import ClubPage from './userPages/clubs/clubPage';

import { PrivateRoute } from './utils/protectedRoutes';


class App extends React.Component {
    

    render(){
        const HeaderWithRouter = withRouter(Header);
        return(
            <>
                <ReactNotification />
                <BrowserRouter>
                    <>
                    <HeaderWithRouter />
                    
                        <Route path='/' exact component={WelcomePage} />
                        <Route path='/login' exact component={LoginForm} />
                        <Route path='/joinus' exact component={JoinUsPage} />
                        <PrivateRoute path='/signup' exact component={SignUpForm} isAuthenticated={this.props.hadFilledForm} />
                        <Route path='/feeds' exact render={props => <div className='body-container'><Sidebar/><Feeds/></div>}/>
                        <Route path='/clubs' exact render={props => <div className='body-container'><Sidebar/><Clubs/></div>}/>
                        {/* <Route path='/' >
                            <Home />
                        </Route> */}
                        <Route path='/clubs/:clubName' >
                            <ClubPage />
                        </Route>
                        {/* <Route path='/notification' exact render={props => <div><Feeds/><Notification/></div>} /> */}
                        
                    </>
                </BrowserRouter>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    if(state.userData.hadFilledForm){
        return{
            hadFilledForm : state.userData.hadFilledForm
        }
    }else{
        return{
            hadFilledForm: false
        }
    }
    
}

export default connect(mapStateToProps)(App);