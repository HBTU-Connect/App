import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
    ChevronRight, 
    Class, 
    School,
    Home,
    Apartment, 
    GroupWork
} from '@material-ui/icons'

//components
import RenderSuggestions from './renderSuggestions';
import RenderInvitations from './renderInvitations'



const ConnectionsPage = () => {

    return (
        <div className='body-container'>
            <div className='connections-page'>
                <div className='connections-page__left'>
                    <div className='connections-page__requests'>
                        <div className='connections-page__requests__header'>
                            Connection Requests
                        </div>
                        <div className='connections-page__requests__content'>
                            <RenderInvitations />
                        </div>
                        <div className='connections-page__requests__footer'>
                           <Link to='/connections/requests'> <div className='div-button'>See all <ChevronRight /></div></Link>
                        </div>
                    </div>
                    <div className='connections-page__suggestions'>
                        <div className='connections-page__suggestions__header'>
                            Poeple you may know
                        </div>
                        <div className='connections-page__suggestions__content'>
                            <RenderSuggestions />
                        </div>
                    </div>
                </div>
                <div className='connections-page__right'>
                    <div className='connections-page__sidebar'>
                        <div className='connections-page__sidebar__header'>
                            People on connect
                        </div>
                        <div className='connections-page__sidebar__content'>
                            <div className='flex center'>
                                <GroupWork fontSize='large' />
                                <span className='margin-right-auto margin-left-1'>All</span>
                                <span>2040</span>
                            </div>
                            <div className='flex center'>
                                <Class fontSize='large' />
                                <span className='margin-right-auto margin-left-1'>BranchMates</span>
                                <span>45</span>
                            </div>
                            <div className='flex center'>
                                <School fontSize='large' />
                                <span className='margin-right-auto margin-left-1'>Final year</span>
                                <span>540</span>
                            </div>
                            <div className='flex center'>
                                <Apartment fontSize='large' />
                                <span className='margin-right-auto margin-left-1'>Hostlers</span>
                                <span>340</span>
                            </div>
                            <div className='flex center'>
                                <Home fontSize='large'/>
                                <span className='margin-right-auto margin-left-1'>Hometown</span>
                                <span>0</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectionsPage