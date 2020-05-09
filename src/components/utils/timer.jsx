import React from 'react';
import Timer from 'react-compound-timer';

const CountDown = (props) => {
    return(
        <>
        <Timer
            initialTime={parseInt(props.initialTime)*1000}
            direction="backward"
        >
            {() => (
                <React.Fragment>
                    <Timer.Days /> days
                    <Timer.Hours /> hours
                    <Timer.Minutes /> minutes
                    <Timer.Seconds /> seconds
                    {/* <Timer.Milliseconds /> milliseconds */}
                </React.Fragment>
            )}
        </Timer>
        </>
    )
}

export default CountDown;