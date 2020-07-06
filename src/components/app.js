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
import AskHbtu from './userPages/askHbtu/askHbtu';
import QuestionPage from './userPages/askHbtu/questionPage';
import Blog from './userPages/blog/blog';
import WriteBlog from './userPages/blog/writeBlog'
import BlogPage from './userPages/blog/blogPage';
// import Home from './userPages/feeds/home'
import ClubPage from './userPages/clubs/clubPage';
import RenderQuiz from './userPages/events/quiz/renderQuiz.jsx'
import CreateQuiz from './userPages/events/quiz/createQuiz.jsx'
import RenderForm from './userPages/events/form/renderForm'
import TextEditor from './userPages/events/utils/textEditor'

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
                        <Route path='/feeds' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar/><Feeds/></div></div>}/>
                        <Route path='/clubs' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar/><Clubs/></div></div>}/>
                        <Route path='/ask' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar/><AskHbtu/></div></div>}/>
                        <Route path='/ask/:id' exact component={QuestionPage} />

                        <Route path='/blogs' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar/><Blog /></div></div>}/>
                        <Route path='/blogs/:id/edit' exact component={WriteBlog} />
                        <Route path='/blogs/new' exact component={WriteBlog} />
                        <Route path='/blogs/:id' exact component={BlogPage} />
                        {/* <Route path='/' >
                            <Home />
                        </Route> */}
                        <Route path='/clubs/:clubName' >
                            <ClubPage />
                        </Route>
                        <Route path='/event/quiz/:id' exact component={RenderQuiz} />
                        <Route path='/event/form/:id' exact component={RenderForm} />
                        <Route path='/event/createform' exact component={CreateQuiz} />
                        <Route path='/event/textEditor' exact component={TextEditor} />
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