import React from 'react';


class Header extends React.Component {
    state = { addClassName : 'header hide'}

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    
    // componentWillUnmount(){
    //     window.removeEventListener('scroll', this.handleScroll);
    // }
    
    handleScroll = (event) => {
        let scrollTop = window.pageYOffset;
        if(scrollTop > 665){
            this.setState({
                addClassName: 'header'
            });
        }else{
            this.setState({
                addClassName: 'header hide'
            });
        } 
    }

    onAuthRender = () => {
        
        if(false){
            return (
                <div className="right-floated-section">
                    <div className='nav-items-container'>
    
                    </div>
                    <div className='nav-button'>
                        <button className='signout-button'>Sign out</button>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="right-floated-section">
                    <div className='nav-button'>
                        <button className='login-button'>Log In</button>
                    </div>
                </div> 
            );
        }
    }

    render(){
        return (
            <div className={ window.location.pathname !== '/login' ?( window.location.pathname === '/' ? `${this.state.addClassName}` : 'header') : 'header hide' } ref='target'>
                <div className='header-main'>
                    <div className='header-main--logo'>
                        {/* <img src={logo} alt='HBTU_Connect' /> */}
                        <div className='header-main--logo-primary'>H</div>
                        <div className='header-main--logo-secondary'>C</div>
                    </div>
                    {this.onAuthRender()}
                </div>
            </div>
        );
    }
}

export default Header;