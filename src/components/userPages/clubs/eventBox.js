import React from 'react'

import CountDown from '../../utils/timer'

const EventBox = (props) => {
    return(
        <div className='event-box'>
            <span className='event-box__heading'>props.heading</span>
            <div className='event-box__events'>
                {props.imageSrc? <img className='event-image' src={props.imageSrc} alt='event'/> : <div>
                        <CountDown initialTime = {props.initialTime}/>
                    </div>}
                <div className='event-details'>
                    <span className='event-details__name'>{props.eventName}</span>
                    <span className='event-details__club'>{props.clubName}</span>
                </div>
                <button className='btn event-action'>
                    {props.eventButtonHeading}
                </button>
            </div>
        </div>
    )
}

export default EventBox;