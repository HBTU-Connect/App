import React, { useState, useEffect } from 'react'

const NotificationPage = () => {
    const [ loading, setLoading ] = useState(true)
    const [ notifications, setNotifications ] = useState([])

    useEffect(() => {
        if(loading){

            setLoading(false)
        }

    }, [loading])




    if(loading){
        return(
            <div className='body-container'>
                <h1>Loading...</h1>
            </div>
        )
    }

    return(
        <div className='body-container notifications'>
            <div className='notification-cotainer'>
                <div className='notification-container__new'>

                </div>
                <div className='notification-container__earlier'>

                </div>
            </div>
        </div>
    )
}

export default NotificationPage