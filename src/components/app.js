import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './header';
import WelcomePage from './welcome/welcome';
import SignUpForm from './auth/signUpForm';


const App = () =>{
    return(
        <div>
            
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path='/' exact component={WelcomePage} />
                    <Route path='/signup' exact component={SignUpForm} />
                    {/* <Route path='/feeds' exact render={props => <div><Feeds/><Clubs/></div>}/>
                    <Route path='/notification' exact render={props => <div><Feeds/><Notification/></div>} /> */}
                    
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;