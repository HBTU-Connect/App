import React, { useEffect } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'

// redux utils
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, getUserInfo } from '../store/userSlice'

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
import ClubPage from './userPages/clubs/clubPage';
import RenderQuiz from './userPages/events/quiz/renderQuiz.jsx'
import CreateQuiz from './userPages/events/quiz/createQuiz.jsx'
import RenderForm from './userPages/events/form/renderForm'
import TextEditor from './userPages/events/utils/textEditor'

import { PrivateRoute } from './utils/protectedRoutes';

import NotificationPage from './notification';
import ProfilePage from './userPages/userProfile/profilePage'


const App = (props) => {

  const dispatch = useDispatch();
  // select user info from store
  const userName = useSelector(state => state.user.info.username)

  //load's user when app first started
  useEffect(() => {
    dispatch(loadUser())
  }, [])

  console.log("userLoaded", userName);

  const HeaderWithRouter = withRouter(Header);

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <>
            <HeaderWithRouter />

            <Route path='/' exact component={WelcomePage} />
            <Route path='/login' exact component={LoginForm} />
            <Route path='/joinus' exact component={JoinUsPage} />
            <PrivateRoute path='/signup' exact component={SignUpForm} isAuthenticated={false} />

            <Route path='/notification' exact component={NotificationPage} />
            <Route path='/user/:username' exact component={ProfilePage} />

            <Route path='/feeds' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar /><Feeds /></div></div>} />
            <Route path='/clubs' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar /><Clubs /></div></div>} />
            <Route path='/ask' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar /><AskHbtu /></div></div>} />
            <Route path='/ask/:id' exact component={QuestionPage} />

            <Route path='/blogs' exact render={props => <div className='body-container'><div className='body-container__wrapper'><Sidebar /><Blog /></div></div>} />
            <Route path='/blogs/:id/edit' exact component={WriteBlog} />
            <Route path='/blogs/new' exact component={WriteBlog} />
            <Route path='/blogs/:id' exact component={BlogPage} />

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
      </SnackbarProvider>
    </>
  )
}

export default App