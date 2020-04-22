import React from 'react';

class ClubPage extends React.Component{
    render(){
        return(
            <div className='body-container'>
                <h1>Welcome to {this.props.match.params.clubName}</h1>
            </div>
        )
    }
}

export default ClubPage;