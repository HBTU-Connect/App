import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { IconButton, Button, TextField, FormControl, Select, MenuItem, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Close, Person, Edit, Public, AlternateEmail, Lock, People, School, CalendarToday, Assignment, AddCircleOutline, Room, Apartment, HomeWork, Instagram, Facebook, LinkedIn, Twitter, Language, GitHub, Cake, PhoneAndroid, Email, WhatsApp, YouTube } from '@material-ui/icons'
import { ChasingDotsSpinner } from '../../utils/loadingSpinner'






const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('rgb(0, 88, 136)'),
        backgroundColor: 'rgb(0, 88, 136)',
        '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
        },
    },
}))(Button);

const EditCard = ({data, editPortalRef, setDisplayEditPortal, page, editProfileDetailsAction, authData }) => {
    const [ activeOption, setActiveOption ] = useState(page || 1)
    const [ userDetails, setUserDetails ] = useState()
    const [ loading, setLoading ] = useState(true)
    const [ newData, setNewData ] = useState({})
    const [ newPrivacy, setNewPrivacy ] = useState({})

    useEffect(() =>{
        if(data){
            setUserDetails(data)
            setNewData({...data.about})
            setLoading(false)

            if(data.settings && data.settings.privacy){
                setNewPrivacy({...data.settings.privacy})
            }
        }
    }, [])

    const handleDone = () => {
        console.log(newData)
        console.log(newPrivacy)

        // add action here
    }

    return(
        <Portal>
            <div ref={editPortalRef} className='portal-container'>
                <div className='portal edit-about-details'>
                    {loading && <div className='loader'><ChasingDotsSpinner /></div>}
                    {!loading && <>
                    <div className='edit-about-details__header'>
                        <span>Edit Details</span>
                        <IconButton className='close-btn' onClick={() => setDisplayEditPortal(false)}><Close fontSize='large' /> </IconButton>
                    </div>
                    <div className='edit-about-details__content'>
                        <div className='edit-about-details__left'>
                            <ul>
                                <li className={activeOption === 1 ? 'active': ''} onClick={() => setActiveOption(1)}>
                                    Basic Info
                                </li>
                                <li className={activeOption === 2 ? 'active': ''} onClick={() => setActiveOption(2)}>
                                    Bio
                                </li>
                                <li className={activeOption === 3 ? 'active': ''} onClick={() => setActiveOption(3)}>
                                    About
                                </li>
                                <li className={activeOption === 4 ? 'active': ''} onClick={() => setActiveOption(4)}>
                                    Contact Details
                                </li>
                            </ul>
                        </div>
                        <div className='edit-about-details__right'>
                            {activeOption === 1 && renderEditBasicInfo(userDetails)}
                            {activeOption === 2 && <RenderEditBio userDetails={userDetails} data={newData} setData={setNewData} privacy={newPrivacy} setPrivacy={setNewPrivacy} />}
                            {activeOption === 3 && <RenderEditAbout userDetails={userDetails} data={newData} setData={setNewData} privacy={newPrivacy} setPrivacy={setNewPrivacy} />}
                            {activeOption === 4 && <RenderEditContactDetails userDetails={userDetails} data={newData} setData={setNewData} privacy={newPrivacy} setPrivacy={setNewPrivacy} />}
                        </div>
                    </div>
                    <div className='edit-about-details__footer'>
                        <Button className='margin-right-2' type='text' onClick={() => setDisplayEditPortal(false)}>Cancel</Button>
                        <ColorButton className='margin-right-2' onClick={() => handleDone()} >Done</ColorButton>
                    </div>
                    </>}
                </div>
            </div>
        </Portal>
    )
}

const Icons = {
    private: <Lock fontSize='large' />,
    public: <Public titleAccess='public' fontSize='large' />,
    connections: <People fontSize='large' />,
    name: <Person fontSize='large' className='margin-right-1' />,
    username: <AlternateEmail fontSize='large' className='margin-right-1' />,
    gender: <Person fontSize='large' className='margin-right-1' />,
    branch: <School fontSize='large' className='margin-right-1' />,
    year: <CalendarToday fontSize='large' className='margin-right-1' />,
    hometown: <Room fontSize='large' className='margin-right-1' />,
    school: <Apartment fontSize='large' className='margin-right-1' />,
    hostel: <HomeWork fontSize='large' className='margin-right-1' />,
    instagram: <Instagram fontSize='large' className='margin-right-1' />,
    facebook: <Facebook fontSize='large' className='margin-right-1' />,
    linkedIn: <LinkedIn fontSize='large' className='margin-right-1' />,
    twitter: <Twitter fontSize='large' className='margin-right-1' />,
    website: <Language fontSize='large' className='margin-right-1' />,
    github: <GitHub fontSize='large' className='margin-right-1' />,
    whatsapp: <WhatsApp fontSize='large' className='margin-right-1' />,
    youtube: <YouTube fontSize='large' className='margin-right-1' />,
    birthday: <Cake fontSize='large' className='margin-right-1' />,
    phone: <PhoneAndroid fontSize='large' className='margin-right-1' />,
    email: <Email fontSize='large' className='margin-right-1' />,

}

const RenderPrivacyMenu = ({value, setValue, field}) => {
    return(
        <FormControl>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
        variant='outlined'
        margin='dense'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='privacy'
          value={value[field]}
          onChange={(e) => setValue({...value, [field] : e.target.value})}
          style={{ display: 'flex', alignItems: 'center'}}
        >
          <MenuItem value={'public'}><Public className='margin-right-1' /> Public</MenuItem>
          <MenuItem value={'connections'}><People className='margin-right-1'/> Connections </MenuItem>
          <MenuItem value={'private'}><Lock className='margin-right-1' /> Only Me </MenuItem>
        </Select>
      </FormControl>
    )
}

const renderEditBasicInfo = (userDetails) => {
    const basicInfo = [ 'name', 'username', 'gender', 'branch', 'year' ]
    const editable = [ false, false, false, false, false ]
    return(
        <>
        <div className='edit-about-details__right__title'>Basic Info</div>
        {basicInfo.map((item, index) => (
            <div key={index} className='edit-about-details__tile'>
                {Icons[item]}
                <div className='edit-about-details__tile__content flex-column margin-right-auto'>
                    <span className={`size-1-6 font-black margin-bottom-half ${item !== 'username' && 'capitalize'}`}>{item === 'name' ? `${userDetails.firstName} ${userDetails.lastName}` : `${userDetails[item]}`}</span>
                    <span className='size-1-2 font-light capitalize'>{item}</span>
                </div>
                <IconButton > {userDetails.settings && (userDetails.settings[item] ? Icons[userDetails.settings[item]] : Icons.public )}</IconButton>
                {editable[index] && <IconButton className='margin-left-half'><Edit fontSize='large' /></IconButton>}
            </div>
        ))}

        </>
    )
}

const RenderEditBio = ({ userDetails, data, setData, privacy, setPrivacy }) => {
    const [ edit, setEdit ] = useState(false)
    const [ value, setValue ] = useState('')
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        setValue(data.bio)
        if(!privacy.bio){
            setPrivacy({...privacy, bio: privacy.bio || 'public'})
        }
        setLoading(false)
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value)
        setData({...data, bio: e.target.value})
    }

    return(
        <>
            <div className='edit-about-details__right__title'>Bio</div>
            {loading && <div className='loader'><ChasingDotsSpinner /> </div> }
            {!edit && !loading && <div className='edit-about-details__tile'>
                <Assignment fontSize='large' className='margin-right-1' />
                <div className='edit-about-details__tile__content flex-column margin-right-auto'>
                    <span className={`size-1-6 font-black margin-bottom-half`}>{value}</span>
                </div>
                <IconButton > {Icons[privacy] }</IconButton>
                <IconButton className='margin-left-half' onClick={() => setEdit(true)}><Edit fontSize='large' /></IconButton>
            </div>}
            {edit && !loading && <div className='edit-about-details__edit'>
                <TextField variant='outlined' inputProps={{ style: {fontSize: '1.4rem', lineHeight: '1.8rem'}}} multiline name='bio' value={value} onChange={(e) => handleChange(e)} rows={4} rowsMax={6} />
                <div className='edit-about-details__edit__action'>
                    <div className='default-privacy flex center margin-right-auto'>
                        {Icons[privacy.bio]}
                        <span className='size-1-4 margin-left-half'>{privacy.bio}</span>
                    </div>
                    <ColorButton onClick={() => setEdit(false)}>Done</ColorButton>
                </div>
            </div>}
        </>
    )
}

const RenderEditAbout = ({ userDetails, data, setData, privacy, setPrivacy }) => {
    const [ edit, setEdit ] = useState({hostel: false, birthday: false, hometown: false, school: false })
    // const [ value, setValue ] = useState({})
    const [ loading, setLoading ] = useState(true)

    const fields = ['hostel', 'birthday', 'hometown', 'school']

    useEffect(() => {
        // let defaultValue = {}
        // fields.forEach((field , index) => {
        //     if(userDetails.about[field]){
        //         defaultValue[field] = userDetails.about[field]
        //     }
        // })
        // setValue({...defaultValue})

        const privacyData={
            hostel: privacy.hostel || 'public',
            birthday: privacy.birthday || 'public',
            hometown: privacy.hometown || 'public',
            school: privacy.school || 'public'
        }  
        setPrivacy({...privacy, ...privacyData})
        setLoading(false)
    }, [])

    return(
        <>
            <div className='edit-about-details__right__title'>About</div>
            {loading && <div className='loader'><ChasingDotsSpinner /></div>}
            {!loading && <>
                {fields.map((field, index) => (
                    <div key={index} className='edit-about-details__about-tile'>
                        <span className='font-black size-1-6 capitalize weight-500 margin-bottom-1'>{field}</span>
                        <div className='edit-about-details__about-tile__content'>
                            {!data[field] && !edit[field] && <div className='flex center' style={{ color: 'blue', cursor:'pointer'}} onClick={() => setEdit({...edit, [field]: true})}>
                                <AddCircleOutline style={{ color: 'blue'}} fontSize='large' className='margin-right-1' />
                                <span className = 'size-1-4 capitalize'>Add {field}</span>
                                </div>}

                            {data[field] && !edit[field] && <div className='flex center'>
                                {Icons[field]}
                                <span className='size-1-4 margin-right-auto capitalize'>{data[field]}</span>
                                <IconButton>{Icons[privacy[field]]}</IconButton>
                                <IconButton onClick={() => setEdit({...edit, [field]: true})}><Edit fontSize='large' /> </IconButton>
                            </div>}
                            {edit[field] && <div className='edit-about-details__edit'>
                                <TextField variant='outlined' inputProps={{ style: {fontSize: '1.4rem', lineHeight: '1.8rem'}}} name='bio' value={data[field]} onChange={(e) => setData({...data, [field]: e.target.value })} />
                                <div className='edit-about-details__edit__action'>
                                    {/* <div className='flex center margin-right-auto'> */}
                                        {/* {Icons[privacy[field]]}
                                        <span className='size-1-4 margin-left-half'>{privacy[field]}</span> */}
                                        <RenderPrivacyMenu value={privacy} setValue={setPrivacy} field={field} />
                                    {/* </div> */}
                                    <ColorButton className='margin-left-auto' onClick={() => setEdit({...edit, [field]: false})}>Done</ColorButton>
                                </div>
                            </div>}
                        </div>
                    </div>
                ))}
            </>}
        </>
    )
}

const SocialField = ({index, handleFieldChange, defaultValue}) => {
    const [value, setValue ] = useState('')

    useEffect(() => {
        setValue(defaultValue)
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value)
        handleFieldChange(e.target.value, index)
    }

    return(
        <TextField autoFocus className='margin-right-2' margin='dense' variant='outlined' inputProps={{ style: {fontSize: '1.4rem', lineHeight: '1.8rem'}}} value={value} onChange={(e) => handleChange(e)}  />
    )
}

const RenderSocialHandleMenu = ({ index, defaultValue, handleTitleChange }) => {
    const[ value, setValue ] = useState('')

    useEffect(() => {
        setValue(defaultValue)
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value)
        handleTitleChange(e.target.value, index)
    }

    return(
        <FormControl>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
        variant='outlined'
        margin='dense'
          labelId="demo-simple-select-social-label"
          id="demo-simple-select-social"
          name='social-handle'
          value={value}
          onChange={(e) => handleChange(e)}
          style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem'}}
        >
          <MenuItem value={'instagram'}>Instagram</MenuItem>
          <MenuItem value={'facebook'}>Facebook </MenuItem>
          <MenuItem value={'twitter'}> Twitter </MenuItem>
          <MenuItem value={'whatsapp'}>WhatsApp </MenuItem>
          <MenuItem value={'youtube'}>YouTube </MenuItem>
          <MenuItem value={'linkedIn'}> LinkedIn </MenuItem>
          <MenuItem value={'github'}> GitHub </MenuItem>
        </Select>
      </FormControl>
    )
}

const RenderEditContactDetails = ({userDetails, data, setData, privacy, setPrivacy}) => {
    const [ edit, setEdit ] = useState({phone: false, email: false, websites: false, socialHandles: false})
    const [ socialHandles, setSocialHandles ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if(data.socialHandles){
            setSocialHandles([...data.socialHandles])
        }
        setPrivacy({...privacy,
            email: privacy.email || 'private',
            phone: privacy.phone || 'private',
            websites: privacy.websites || 'connections',
            socialHandles: privacy.websites || 'connections'
        })
        setLoading(false)
    }, [])

    const handleFieldChange = (value, index) => {
        // setValue(e.target.value)
        const newSocialHandles = socialHandles
        newSocialHandles[index] = {...newSocialHandles[index], content: value}
        setSocialHandles(newSocialHandles)
        setData({...data, socialHandles: newSocialHandles})
    }

    const handleTitleChange = (value, index) => {
        const newSocialHandles = socialHandles
        newSocialHandles[index] = {...newSocialHandles[index], title: value}
        setSocialHandles(newSocialHandles)
        setData({...data, socialHandles: newSocialHandles})
    }

    const handleRemoveItem = (index) => {
        const newSocialHandles = socialHandles
        newSocialHandles.splice(index, 1)
        setSocialHandles([...newSocialHandles])
        setData({...data, socialHandles: newSocialHandles})
    }

    const addSocialHandle = () => {
        setEdit({...edit, socialHandles: true})
        const newSocialHandle = { title: 'instagram', content: '' }
        setSocialHandles([...socialHandles, newSocialHandle])
        setData({...data, socialHandles: [...socialHandles, newSocialHandle]})
    }

    const addWebsite = () => {
        setEdit({...edit, websites: true})
        const newWebsite = { title: 'website', content: '' }
        setSocialHandles([...socialHandles, newWebsite])
        setData({...data, socialHandles: [...socialHandles, newWebsite]})
    }

    const contactInfoFields = ['phone', 'email']

    return(
        <>
        <div className='edit-about-details__right__title'>Contact</div>
        {loading && <div className='loader'><ChasingDotsSpinner /></div>}
        {!loading && <>
            <div className='edit-about-details__contact-tile'>
                <span className='font-black size-1-6 capitalize weight-500 margin-bottom-1'>Contact info</span>
                {contactInfoFields.map((field, index) => (
                    <div key={index}>
                        {!edit[field] && <div key={index} className='flex center margin-bottom-half'>
                            {Icons[field]}
                            <span className='margin-right-auto size-1-4'>{userDetails[field]}</span>
                            <IconButton>{Icons[privacy[field]]}</IconButton>
                            <IconButton onClick={() => setEdit({...edit, [field]: true})}><Edit fontSize='large' /> </IconButton>
                            
                        </div>}
                        {edit[field] && <div className='margin-bottom-1'>
                                <TextField margin='dense' value={userDetails[field]} inputProps={{ style: { fontSize: '1.4rem' }}} disabled={true} variant='outlined' />
                                <div className='edit-about-details__edit__action'>
                                    <RenderPrivacyMenu value={privacy} setValue={setPrivacy} field={field} />
                                    <ColorButton className='margin-left-auto' onClick={() => setEdit({...edit, [field]: false})}>Done</ColorButton>
                                </div>
                            </div>}
                    </div>
                ))}
                
            </div>
            <div className='edit-about-details__contact-tile'>
                <div className='flex center'>
                    <span className='font-black size-1-6 capitalize weight-500 margin-right-auto'>Websites</span>
                    <IconButton>{Icons[privacy.websites]}</IconButton>
                    <IconButton onClick={() => setEdit({...edit, websites: true})}><Edit fontSize='large' /> </IconButton>
                </div>
                <div className='flex center margin-bottom-1' style={{ color: 'blue', cursor:'pointer'}} onClick={addWebsite} >
                    <AddCircleOutline style={{ color: 'blue'}} fontSize='large' className='margin-right-1' />
                    <span className = 'size-1-4 capitalize'>Add Website</span>
                </div>

                {edit.websites && socialHandles.map((handle, index) => {
                    if(handle.title === 'website'){
                        return(
                            <div key={index} className='flex center'>
                            <SocialField index={index} handleFieldChange={handleFieldChange} defaultValue={socialHandles[index].content} />
                            <IconButton className='margin-left-auto' onClick={() => handleRemoveItem(index)}><Close fontSize='large' /> </IconButton>
                            </div>
                        )
                    }
                })}
                {edit.websites && <div className='flex-column'>
                    <Divider style={{ width: '100%', marginTop: '2rem'}} />
                    <div className='edit-about-details__edit__action flex center margin-bottom-1'>
                        <RenderPrivacyMenu value={privacy} setValue={setPrivacy} field={'websites'} />
                        <ColorButton className='margin-left-auto' onClick={() => setEdit({...edit, websites: false})}>Done</ColorButton>
                    </div>
                </div>}
                {!edit.websites  && socialHandles.map((handle, index) => {
                    if(handle.title === 'website' && handle.content !== ''){
                        return(
                            <div key={index} className='flex center margin-bottom-1' style={{ width: '100%' }}>
                                {Icons[handle.title]}
                                <span className='size-1-4 margin-right-auto'>{handle.content}</span>
                            </div>
                        )
                    }
                })}
            </div>
            <div className='edit-about-details__contact-tile'>
                <div className='flex center'>
                    <span className='font-black size-1-6 capitalize weight-500 margin-right-auto'>Social Handles</span>
                    <IconButton>{Icons[privacy.socialHandles]}</IconButton>
                    <IconButton onClick={() => setEdit({...edit, socialHandles: true})}><Edit fontSize='large' /> </IconButton>
                </div>
                <div className='flex center margin-bottom-2' style={{ color: 'blue', cursor:'pointer'}} onClick={addSocialHandle} >
                    <AddCircleOutline style={{ color: 'blue'}} fontSize='large' className='margin-right-1' />
                    <span className = 'size-1-4 capitalize'>Add Social Handle</span>
                </div>

                {edit.socialHandles && socialHandles.map((handle, index) => {
                    if(handle.title !== 'website'){
                        return(
                            <div key={index} className='flex center'>
                            <SocialField index={index} handleFieldChange={handleFieldChange} defaultValue={socialHandles[index].content} />
                            <RenderSocialHandleMenu index={index} defaultValue={socialHandles[index].title} handleTitleChange={handleTitleChange} />
                            <IconButton className='margin-left-auto' onClick={() => handleRemoveItem(index)}><Close fontSize='large' /> </IconButton>
                            </div>
                        )
                    }
                })}
                {edit.socialHandles && <div className='flex-column'>
                <Divider style={{ width: '100%', marginTop: '2rem'}} />
                <div className='edit-about-details__edit__action flex center margin-bottom-1'>
                    <RenderPrivacyMenu value={privacy} setValue={setPrivacy} field={'socialHandles'} />
                    <ColorButton className='margin-left-auto' onClick={() => setEdit({...edit, socialHandles: false})}>Done</ColorButton>
                </div>
                </div>}

                {!edit.socialHandles  && socialHandles.map((handle, index) => {
                    if(handle.title !== 'website' && handle.content !== ''){
                        return(
                            <div key={index} className='flex center margin-bottom-2' style={{ width: '100%' }}>
                                {Icons[handle.title]}
                                <span className='size-1-4 margin-right-auto'>{handle.content}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </>}
        </>
    )
}

// const mapStateToProps = (state) => {
//     return{
//         authData: state.authData
//     }
// }

export default EditCard