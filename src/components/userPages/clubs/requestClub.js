import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { TextField, Button, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0, 88, 136)'),
      backgroundColor: 'rgb(0, 88, 136)',
      '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
      },
    },
  }))(Button);

const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

const RequestClub = ({ portalRef, setDisplayPortal }) => {
    const [ clubName, setClubName ] = useState('')
    const [ clubDescription, setClubDescription ] = useState('')
    const [ error, setError ] = useState({name: null, desc: null})
    
    const handleRequestSubmit = () => {
        if(clubName === ''){
            setError({...error, name : 'Required'})
        }
        else if(clubDescription === ''){
            setError({...error, desc : 'Required'})
        }
        else{
            const formValues = { clubName: clubName, clubDescription: clubDescription}
            console.log(formValues)
        }
    }

    return(
        <Portal>
            <div ref={portalRef} className='request-club-card__wrapper'>
                <div className='request-club-card'>
                    <div className='request-club-card__header'> 
                        <span>Request a Club</span>
                        <IconButton onClick={() => setDisplayPortal(false)}><CloseIcon fontSize='large'/> </IconButton>

                    </div>
                    <div className='request-club-card__tile'>
                        <span className='request-club-card__title'>
                            Club Name {error.name && <span style={{ color: 'red', marginLeft: '.5rem', fontSize: '1.4rem' }}>{error.name} </span>}
                        </span>
                        <TextField name='clubName' variant='outlined' value={clubName} onChange={(e) => {setClubName(e.target.value); setError({...error, name: null }) }}  />
                        <span className='request-club-card__helper'>This club name will also used for club address i.e. @{clubName.toLowerCase().replace(/\W/g, '')}</span>
                    </div>
                    <div className='request-club-card__tile'>
                        <span className='request-club-card__title'>
                            Description {error.desc && <span style={{ color: 'red', marginLeft: '.5rem', fontSize: '1.4rem' }}>{error.desc} </span>}
                        </span>
                        <TextField name='clubDescription' variant='outlined' value={clubDescription} onChange={(e) => {setClubDescription(e.target.value); setError({...error, desc: null }) }} multiline rows={4} rowsMax={4} />
                        <span className='request-club-card__helper'>Write about the club, or the purpose of the Club. (max char: 255)</span>
                    </div>
                    <span className='request-club-card__helper'>You can add images, contact info and other details after your request get approved by admin</span>
                    <div className='request-club-card__action'>
                    <ColorButton variant='contained' onClick={handleRequestSubmit} style={{ marginRight: '1rem', width: '100%'}}>Request</ColorButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default RequestClub