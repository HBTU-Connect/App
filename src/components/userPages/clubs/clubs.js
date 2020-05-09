import React from 'react';

import ClubCard from './club-card'
import EventBox from './eventBox'

import ECellImg from '../../../images/clubs/ECell-profile.jpg'
import QuizImg from '../../../images/clubs/Quiz-profile.jpg';
import DebateImg from '../../../images/clubs/debate.jpg';

class Clubs extends React.Component{
    state = {
        clubs: [{title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}],
        myclubs: [{title: 'ECell', img: ECellImg}, {title: 'Qfrad', img: QuizImg}, {title: 'Debnexus', img: DebateImg }, {title: 'Qfrad', img: QuizImg}]
    }
    render(){
        return(
            <>
            <div className='content-container'>
                <div className='content-container__left'>
                    <div className='clubs-list-container'>
                        <span className='section-heading'>Clubs</span>
                        {/* <div className='divider'></div> */}
                        <div className='section-content'>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>
                        <div className='my-clubs__container'>
                            <span className='my-clubs__container-heading'> Your Clubs</span>
                            {this.state.myclubs.map((club, i) => {
                                    return(
                                        <ClubCard 
                                            name={club.title} 
                                            profile={club.img}
                                            details='This is a club. Lorem ipsum dolor sit amet, consectetur adipiscing elit' 
                                            key={i} 
                                            classname='my-clubs__container'
                                        />
                                    )
                                })}
                        </div>
                        <div className='other-clubs__container'>
                        <span className='other-clubs__container-heading'> Other Clubs You May Join</span>
                            {this.state.clubs.map((club, i) => {
                                return(
                                    <ClubCard 
                                        name={club.title} 
                                        profile={club.img}
                                        details='This is a club. Lorem ipsum dolor sit amet, consectetur adipiscing elit' 
                                        key={i} 
                                        classname='other-clubs__container'
                                    />
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
                <div className='content-container__ right'>
                    <EventBox />
                </div>
            </div>

            
            </>
        );
    }
}

export default Clubs;