import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import Header from './header';
import WelcomePage from './welcome/welcome';
import SignUpForm from './auth/signUpForm';

import { PrivateRoute } from './utils/protectedRoutes';


class App extends React.Component {
    

    render(){
        const HeaderWithRouter = withRouter(Header);
        return(
            <div>
                
                <BrowserRouter>
                    <div>
                    <HeaderWithRouter />
                        <Route path='/' exact component={WelcomePage} />
                        {/* <Route path='/signup' exact component={SignUpForm} /> */}
                        <PrivateRoute path='/signup' exact component={SignUpForm} isAuthenticated={this.props.hadFilledForm} />
                        {/* <Route path='/feeds' exact render={props => <div><Feeds/><Clubs/></div>}/>
                        <Route path='/notification' exact render={props => <div><Feeds/><Notification/></div>} /> */}
                        
                    </div>
                </BrowserRouter>
            </div>
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