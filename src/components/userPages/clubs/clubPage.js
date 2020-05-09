import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'


import ClubPageNav from './clubPage/clubPageNav'
import ClubFeeds from './clubPage/clubFeeds';
import ClubEvents from './clubPage/clubEvents';
import ClubMembers from './clubPage/clubMembers';
import ClubAbout from './clubPage/clubAbout';


import coverImage from '../../../images/clubs/cover-1.jpg'
import ECell from '../../../images/clubs/ECell-profile.jpg'
import Qfrat from '../../../images/clubs/Quiz-profile.jpg';
import Debnexus from '../../../images/clubs/debate.jpg';

class ClubPage extends React.Component{

    state = {
        img: [ECell, Qfrat, Debnexus],
        Ecell: ECell,
        pageOffset: 0
    }

    handleScroll= () => {
        const bodyScroll = document.getElementsByClassName('club-page-container')[0].scrollTop
        if(this.state.pageOffset !== bodyScroll){
            this.setState({pageOffset: bodyScroll})
        }
        const clubCover = document.getElementsByClassName('club-cover__cover')[0]
        const clubProfile = document.getElementsByClassName('club-cover__profile')[0]
        const clubNavBar = document.getElementsByClassName('club-navbar')[0]
        const clubSidebar = document.getElementsByClassName('club-content__sidebar')[0]
            clubCover.style.transform = `translateY(${this.state.pageOffset/2}px)`
            
        if(bodyScroll === 0){
            clubCover.style.transform = `translateY(0px)`
            clubProfile.style.transform = `translateY(80px)`
            clubNavBar.style.transform = `translateY(${0}px`

        }

        if(bodyScroll >= 300){
            clubProfile.style.transform = `translateY(${bodyScroll-300+180}px) scale(${1-(300/700)})`
            clubNavBar.style.transform = `translateY(${bodyScroll - 300}px`

        }else{
            clubProfile.style.transform = `translateY(${80+this.state.pageOffset/3}px) scale(${1-(this.state.pageOffset/700)})`
            clubSidebar.style.paddingTop = `${this.state.pageOffset/3}px`
        }
    }

    render(){
        const { clubName } = this.props.match.params
        return(
            <div className='body-container club-page-container' onScroll={this.handleScroll}>
                <div className='club-cover'>
                    <img className='club-cover__cover' src={coverImage} alt='Club Cover' />
                    <img className='club-cover__profile' src={this.state.img[0]} alt='Club Profile' />
                </div>
                <div className='club-navbar'>
                    <ClubPageNav clubName={clubName}/>
                </div>
                <div className='club-content'>
                    <div className='club-content__sidebar'>
                        <span className='club-name'>{clubName}</span>
                        <span className='club-username'>@ecell</span>
                        <div className='club-description'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. 
                        </div>
                        <div className='club-hightlights'>

                        </div>
                    </div>
                    <>
                    <Switch>
                        <Route path='/clubs/:clubName/' exact component={ClubFeeds} />
                        <Route path='/clubs/:clubName/events' exact component={ClubEvents} />
                        <Route path='/clubs/:clubName/members' exact component={ClubMembers} />
                        <Route path='/clubs/:clubName/about' exact component={ClubAbout} />
                    </Switch>
                    </>
                </div>
            </div>
        )
    }
}

export default withRouter(ClubPage);