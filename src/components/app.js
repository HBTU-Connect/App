import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './header';
import WelcomePage from './welcome/welcome';


const App = () =>{
    return(
        <div>
            
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                    <Route path='/' exact component={WelcomePage} />
                    {/* <Route path='/feeds' exact render={props => <div><Feeds/><Clubs/></div>}/>
                    <Route path='/notification' exact render={props => <div><Feeds/><Notification/></div>} /> */}
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;