import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Assignment as AssignmentIcon,
        AssignmentInd as AssignmentIndIcon,
        CalendarToday as CalendarTodayIcon,
        School,
        Apartment,
        HomeWork,
        Facebook,
        Instagram,
        LinkedIn,
        Twitter,
        Language,
        GitHub,
        Room,
        Cake,
        PhoneAndroid,
        Email,
        Contacts,
        Edit,
        Add,
        ExpandMore,
        Loyalty,
        Close,
        Album,
        Movie,
        MenuBook,
        WhatsApp,
        YouTube
} from '@material-ui/icons'

import SearchData from './searchData'
import EditCard from './editCard'
import {ChasingDotsSpinner} from '../../utils/loadingSpinner'
import Footer from '../footer'
import { getUserInfo, getUserAbout, getUserSettings } from '../../../store/userSlice'


//image
import userImage from '../../../images/profile.jpg'
import ECellImg from '../../../images/clubs/ECell-profile.jpg'

const aboutTileIcons = {
    branch: <School />,
    year: <CalendarTodayIcon />,
    homeTown: <Room />,
    school: <Apartment />,
    hostel: <HomeWork />,
    instagram: <Instagram />,
    facebook: <Facebook />,
    linkedIn: <LinkedIn />,
    twitter: <Twitter />,
    website: <Language />,
    github: <GitHub/>,
    birthday: <Cake />,
    phone: <PhoneAndroid/>,
    email: <Email />,
    whatsapp: <WhatsApp />,
    youtube: <YouTube />
}

const branches = {
    cse: 'Computer Sc. & Engg.',
    me: 'Mechanical Engg.'
}

const ColorButton = withStyles((theme) => ({
    root: {
        color: 'rgb(0, 88, 136)',
        backgroundColor: 'rgb(226, 245, 255)',
        '&:hover': {
        backgroundColor: 'rgb(204, 238, 255)',
        },
    },
}))(Button);

const ColorPrimaryButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('rgb(0, 88, 136)'),
        backgroundColor: 'rgb(0, 88, 136)',
        '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
        },
    },
}))(Button);

const renderAboutCard = (data, setDisplayEditPortal, setEditPage) => {
    const about = data.about
    const userFields = ['branch', 'year']
    const aboutFields = ['hostel', 'birthday', 'homeTown', 'school' ]
    return(
        <div className='card-profile card-small'>
            <span className='card-small__header'>
                <AssignmentIndIcon fontSize='large' style={{ marginRight: '1rem'}} />
                About
            </span>
            <div className='card-small__content'>
                {// eslint-disable-next-line
                userFields.map((field, index) => {
                    if(data[field]){
                        return(
                            <div key={index} className='card-small__content__tile'>
                                {aboutTileIcons[field]}
                                <span className='content-tile__title'>
                                    {field}
                                </span>
                                <span>
                                    {field === 'branch' ? branches[data[field]] : data[field]}
                                </span>
                            </div>
                        )
                    }
                })}
                {// eslint-disable-next-line
                aboutFields.map((field, index) => {
                    if(about[field]){
                        return(
                            <div key={index} className='card-small__content__tile'>
                                {aboutTileIcons[field]}
                                <span className='content-tile__title'>
                                    {field === 'homeTown' ? 'from' : field}
                                </span>
                                <span>
                                    {about[field]}
                                </span>
                            </div>
                        )
                    }
                })}
                
            </div>
            <ColorButton variant='text' onClick={() => {setEditPage(3); setDisplayEditPortal(true)} }>Edit About</ColorButton>
        </div>
    )
}

const renderContacts = (data, lastCardRef, setDisplayEditPortal, setEditPage) => {
    const socialHandles = data.about.socialHandles
    const contactFields = ['phone', 'email']
    return(
        <div ref={lastCardRef} className='card-profile card-small'>
            <span className='card-small__header'>
                <Contacts fontSize='large' style={{ marginRight: '1rem'}} />
                Contact
            </span>
            <div className='card-small__content'>
            {// eslint-disable-next-line
            contactFields.map((field, index) => {
                    if(data[field]){
                        return(
                            <div key={index} className='card-small__content__tile'>
                                {aboutTileIcons[field]}
                                {/* <span className='content-tile__title'>
                                    {field}
                                </span> */}
                                <span className='social-links'>
                                    {data[field]}
                                </span>
                            </div>
                        )
                    }
                })}
            {// eslint-disable-next-line
            socialHandles && socialHandles.map((handle, index) => {
                    return(
                        <div key={index} className='card-small__content__tile'>
                            {aboutTileIcons[handle.title]}
                            {/* <span className='content-tile__title'>
                                {field}
                            </span> */}
                            <span className='social-links'>
                                {handle.content}
                            </span>
                        </div>
                    )
                })}
            </div>
            <ColorButton variant='text' onClick={() => {setEditPage(4); setDisplayEditPortal(true)} }>Edit Contact Details</ColorButton>
        </div>
    )

}

const renderActivity = () => {
    return(
        <div className='card-profile card-large'>
            <div className='card-large__header'>
                Activity
            </div>
            <div className='card-large__content'>
                <span className='no-activities'>No Activities</span>
            </div>
        </div>
    )
}

const renderConnectionCard = (connections) => {
    return(
        <div className='card-profile card-large'>
            <div className='card-large__header'>
                <span>Connections</span>
                <div className='mid-dot-divider'></div>
                <span className='card-large__header__secondary'>{connections.length} </span>
            </div>
            <div className='card-large__content grid-view margin-bottom-3'>
                {connections.length === 0 && <span className='no-activities'>No Connection</span>}
                {// eslint-disable-next-line
                connections.map((connection, index) => {
                    if(index < 6){
                        return(
                            <div key={index} className='profile-connection-card flex padding-1  margin-bottom-1'>
                                <img className='image round' src={userImage} alt={connection.firstName}/>
                                <div className='profile-connection-card__content flex-column'>
                                    <span className='span-child-1 font-black weight-500 size-1-6 margin-bottom-half'>{`${connection.firstName} ${connection.lastName}`} </span>
                                    <span className='font-light margin-bottom-half size-1-4'>{connection.username} </span>
                                    <div className='flex center'>
                                        <span className='font-light size-1-4'>{connection.year === 'first' ? '1st': connection.year === 'second' ? '2nd' : connection.year === 'third' ? '3rd': connection.year} </span>
                                        <div className='mid-dot-divider'></div>
                                        <span className='font-light size-1-4 uppercase'>{connection.branch} </span>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            {connections.length > 0 && <ColorButton>View All</ColorButton>}
        </div>
    )
}

const RenderClubsCard = ({clubs}) => {
    const [length, setLength] = useState(4)

    return(
        <div className='card-profile card-large'>
            <div className='card-large__header'>
                <span>Your Clubs</span>
                <div className='mid-dot-divider'></div>
                <span className='card-large__header__secondary'>{clubs.length} </span>
            </div>
            <div className='card-large__content grid-view clubs'>
                {clubs && clubs.length === 0 && <span className='no-activities'>No Clubs</span>}
                {clubs && clubs.length > 0 &&
                // eslint-disable-next-line
                 clubs.map((club, index) => {
                    if(index<length){
                        return(
                            <div key={index} className='profile-page__club-card flex center padding-1'>
                                <img className='image semi-round' src={ECellImg} alt={club.clubName} />
                                <div className='flex-column'>
                                    <span className='size-1-6 weight-500 font-black margin-bottom-half'>{club.clubName} </span>
                                    <span className='size-1-4 font-light margin-bottom-half'>@{club.clubAddress} </span>
                                    <span className='size-1-4 font-light margin-bottom-1'>{`${club.members} members`} </span>
                                </div>
                                
                            </div>
                        )
                    }
                })}
            </div>
            {clubs.length > 0 && <ColorButton onClick={() => setLength(clubs.length)}>View All</ColorButton>}
        </div>
    )
}

const InterestSection = ({ name, data }) => {
    const [ sectionData, setSectionData ] = useState([])
    const [ displayPortal, setDisplayPortal ] = useState(false)
    const [ done, setDone ] = useState(false)
    const portalRef = useRef(null)

    useEffect(() => {
        console.log(sectionData.length)
        setSectionData([...data])
        // eslint-disable-next-line
    },[data])

    useEffect(() => {
        if(displayPortal && portalRef.current){
            portalRef.current.style.top = '0'
            portalRef.current.style.left = '0'
        }
        else if(!displayPortal && portalRef.current){
            portalRef.current.removeAttribute('style')
        }
    }, [displayPortal])

    const handleItemRemove = (index) => {
        let newSectionData = sectionData
        newSectionData.splice(index, 1)
        console.log(newSectionData)
        setSectionData([...newSectionData])
    }

    return(
        <>
        {displayPortal && <SearchData name={name} sectionData={sectionData} setSectionData={setSectionData} setDisplayPortal={setDisplayPortal} portalRef={portalRef} />}
        <div className='card-profile card-large'>
            <div className='card-large__header'>
                <span>{name === 'tvSeries' ? 'Tv Series' : name} </span>
                {!done && <ColorPrimaryButton onClick={() => setDone(true)}>Done</ColorPrimaryButton>}
                {done && <IconButton style={{marginLeft: 'auto'}} onClick={() => setDone(false)}><Edit fontSize='large' /> </IconButton>}
            </div>
            <div className='card-large__content grid-view interests-section'>
                {sectionData.map((item, index) => {
                    return(
                        <div key={index} className='section-card'>
                            {!done && <IconButton className='section-card__button' size='small' onClick={() => handleItemRemove(index)}><Close fontSize='large' /> </IconButton>}
                            {name === 'interests' && <> 
                                <div className='section-card__icon'>
                                    <Loyalty />
                                </div>
                                <span className={`${item.length > 20 ? 'size-1-2': 'size-1-4'} weight-400 margin-bottom-2`}>{item}</span>
                            </>}
                            {name === 'music' && <>
                                    {item.track && item.track.images ? <img src={item.track.images.coverart} alt='poster' />: <div className='section-card__icon'><Album /></div> }
                                    <span className={`${item.track.title.length > 20 ? 'size-1-2': 'size-1-4'} font-black weight-400 margin-bottom-half`}>{item.track.title}</span>
                                    <span className='size-1-2 font-light margin-bootom-2'>{item.track.subtitle}</span>
                            </>}
                            {name === 'movies' && <>
                                {item.image  ? <img src={item.image} alt='poster' />: <div className='section-card__icon'><Movie /></div> }
                                <span className={`${item.title.length > 20 ? 'size-1-2': 'size-1-4'} font-black weight-400 margin-bottom-half`}>{item.title}</span>
                            </>}
                            {name === 'tvSeries' && <>
                                {item.image_thumbnail_path  ? <img className='tv-series' src={item.image_thumbnail_path} alt='poster' />: (item.image ?  <img src={item.image} alt='poster' /> : <div className='section-card__icon'><Movie /></div> )}
                                    <span className={`${ item.title ? (item.title.length > 20 ? 'size-1-2': 'size-1-4') : (item.name.lenght > 20 ? 'size-1-2': 'size-1-4') } font-black weight-500 margin-bottom-half`}>{item.name ? item.name : item.title}</span>
                                    {item.network && <span className='size-1-2 font-light margin-bootom-2'>{item.network}</span>}
                                </>
                            }
                            {name=== 'books' && <>
                                {item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail  ? <img src={item.volumeInfo.imageLinks.smallThumbnail} alt='poster' />: <div className='section-card__icon'><MenuBook /></div> }
                                <span className={`${item.volumeInfo.title.length > 20 ? 'size-1-2': 'size-1-4'} font-black weight-400 margin-bottom-half`}>{item.volumeInfo.title}</span>
                                <span className='size-1-2 font-light margin-bootom-2 flex-column'>{item.volumeInfo.authors.map((author, index) => (<span key={index}>{author}</span>))}</span>
                            </>}
                        </div>
                    )
                })}
                {!done && sectionData.length < 6 && <div className='section-card add-data-card' onClick={() => setDisplayPortal(true)}>
                    <Add />
                </div>}
                {done && sectionData.length === 0 && <span className='no-activities capitalize'>No {name === 'tvSeries' ? 'TV Series' : name}</span> }
            </div>
            
        </div>
        </>
    )
}

const ProfilePage = (props) => {
    const [ userDetails, setUserDetails ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const [ interestSections, setInterestSections ] = useState([])
    const [ displayPortal, setDisplayPortal ] = useState(false)
    const [ displayEditPortal, setDisplayEditPortal ] = useState(false)
    const [ editPage, setEditPage ] = useState(0)
    const [ image, setImage] = useState('https://source.unsplash.com/1_CMoFsPfso')
    const portalRef = useRef(null)
    const editPortalRef = useRef(null)
    const lastCardRef = useRef(null)
    const leftContainerRef = useRef(null)

    const user = useSelector(getUserInfo)
    const userAbout = useSelector(getUserAbout)
    const userSettings = useSelector(getUserSettings)

    useEffect(() => {
        if(user.username){
            const userData = {...user, about: userAbout, settings: userSettings}
            setUserDetails(userData)
            setLoading(false)
        }
    }, [user, userAbout, userSettings])

    const addInterestSection = (name) => {
        setAnchorEl(null)
        const newInterestSection = {
            name: name,
            data: []
        }
        let flag = 0
        interestSections.forEach((interestSection) => {
            if(interestSection.name === name){
                flag =1
            }
        })
        if(flag === 0)
            setInterestSections([...interestSections, newInterestSection ])
        console.log(interestSections)
    }

    useEffect(() => {
        if(displayPortal && portalRef.current){
            portalRef.current.style.top = '0'
            portalRef.current.style.left = '0'
        }
        else if(!displayPortal && portalRef.current){
            portalRef.current.removeAttribute('style')
        }
    }, [displayPortal])

    useEffect(() => {
        if(displayEditPortal && editPortalRef.current){
            editPortalRef.current.style.top = '0'
            editPortalRef.current.style.left = '0'
        }
        else if(!displayEditPortal && editPortalRef.current){
            editPortalRef.current.removeAttribute('style')
        }
    }, [displayEditPortal])

    const handleScroll = (e) => {
        const body = document.getElementsByClassName('profile-page__content')[0]
        if(lastCardRef.current && leftContainerRef.current && e.target.scrollTop > (leftContainerRef.current.offsetTop + lastCardRef.current.offsetTop - 60) ){
            if(body.getBoundingClientRect().bottom > e.target.offsetHeight - 50){
                leftContainerRef.current.style.transform = `translateY(${e.target.scrollTop - (leftContainerRef.current.offsetTop + lastCardRef.current.offsetTop -60)}px)`
            }
        }
        else{
            leftContainerRef.current.style.transform = `translateY(${0}px)`

        }
    }


    if(loading){
        return(
            <div className='body-container'>
                <div className='loader'>
                    <ChasingDotsSpinner />
                </div>
            </div>
        )
    }
    return(
        <div onScroll={(e) => handleScroll(e)} className='body-container profile-page-container'>

        {displayPortal && <SearchData name={'coverImage'} setSectionData={setImage} setDisplayPortal={setDisplayPortal} portalRef={portalRef} />}
        {displayEditPortal && <EditCard page={editPage} data={userDetails} setDisplayEditPortal={setDisplayEditPortal} editPortalRef={editPortalRef} />}
            <div className='profile-page'>
                <div className='profile-page__top-card'>
                    <div className='profile-page__cover-container'>
                        <img className='profile-page__cover' src={image} alt={`https://unsplash.com/photos/1_CMoFsPfso`} />
                        <IconButton className='edit-button__cover' onClick={() => setDisplayPortal(true)}><Edit fontSize='large' /> </IconButton>
                    </div>
                    <div className='profile-page__profile-img-container'>
                        <img className='profile-page__profile-img' src={userImage} alt={userDetails.firstName} />
                        <IconButton className='edit-button__profile'><Edit fontSize='large' /> </IconButton>
                    </div>
                    <span className='profile-page__name'>{`${userDetails.firstName} ${userDetails.lastName}`} </span>
                    <span className='profile-page__username'>@{userDetails.username} </span>
                    <div className='profile-page__menu'>
                        <ColorPrimaryButton variant='contained' onClick={(event) => setAnchorEl(event.currentTarget)}>Add Section{' '}<ExpandMore fontSize='large' style={{ marginLeft: '.5rem'}} /> </ColorPrimaryButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            >
                            <MenuItem onClick={() => addInterestSection('interests')}>Add Interests</MenuItem>
                            <MenuItem onClick={() => addInterestSection('books')}>Add Favorite Books</MenuItem>
                            <MenuItem onClick={() => addInterestSection('movies')}>Add Favorite Movies</MenuItem>
                            <MenuItem onClick={() => addInterestSection('tvSeries')}>Add Favorite TV Series</MenuItem>
                            <MenuItem onClick={() => addInterestSection('music')}>Add Favorite Music</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className='profile-page__content'>
                    <div ref={leftContainerRef} className='profile-page__content__left'>
                        <div className='card-profile card-small'>
                            <span className='card-small__header'>
                                <AssignmentIcon fontSize='large' style={{ marginRight: '1rem'}} />
                                Bio
                            </span>
                            <div className='card-small__content'>
                                {userDetails.about.bio}
                            </div>
                            <ColorButton variant='text' onClick={() => {setEditPage(2); setDisplayEditPortal(true)}}>Edit Bio</ColorButton>
                        </div>
                        {renderAboutCard(userDetails, setDisplayEditPortal, setEditPage)}
                        {renderContacts(userDetails, lastCardRef, setDisplayEditPortal, setEditPage)}
                        <Footer class='profile-page' />
                    </div>
                    <div className='profile-page__content__right'>
                        {renderActivity()}
                        {userDetails.connections && renderConnectionCard(userDetails.connections)}
                        {userDetails.clubs && <RenderClubsCard clubs={userDetails.clubs} />}
                        {interestSections.map((interestSection, index) => {
                            return(
                                <InterestSection key={index} name={interestSection.name} data={interestSection.data} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const sampleData = {
    firstName: 'Yashveer',
    lastName: 'Talan',
    username: 'yv_official',
    branch: 'cse',
    year: 'third',
    gender: 'male',
    email: '170104065@gmail.com',
    phone: '8126560602',
    about: {
        bio: 'Web & App Developer at Entrepreneurship Cell, HBTU Kanpur',
        birthday: '3 November',
        hometown: 'Jewar',
        school: 'Pragyan Public School',
        // hostel: 'Raman Hostel',
        socialHandles: [
            {title: 'instagram', content: 'yv_official'},
            {title: 'facebook', content: 'yashveer.talan.9'},
            {title: 'linkedIn', content: 'yashveertalan'},
            {title: 'whatsapp', content: '8126560602'},
            {title: 'twitter', content: 'yv_official_'},
            {title: 'github', content: 'yv-official'}
        ],
    },
    settings: {
        privacy: {
            email: 'connections',
            phone: 'private',
            bio: 'public',
            birthday: 'public',
            hometown: 'public',
            school: 'connections',
            hostel: 'public',
            socialHandles: 'connections',
            websites: 'connections'
        }
    },
    connections: [
        {
            firstName: 'Rigved',
            lastName: 'Sambyal',
            username: '@rigved',
            branch: 'cse',
            year: 'third',
        },
        {
            firstName: 'Aditya',
            lastName: 'Rajput',
            username: '@adinova',
            branch: 'cse',
            year: 'third',
        },
        {
            firstName: 'Aditya',
            lastName: 'Rajput',
            username: '@adinova',
            branch: 'cse',
            year: 'third',
        },
        {
            firstName: 'Aditya',
            lastName: 'Rajput',
            username: '@adinova',
            branch: 'cse',
            year: 'third',
        },
        {
            firstName: 'Aditya',
            lastName: 'Rajput',
            username: '@adinova',
            branch: 'cse',
            year: 'third',
        },
        {
            firstName: 'Aditya',
            lastName: 'Rajput',
            username: '@adinova',
            branch: 'cse',
            year: 'third',
        },
        {
            firstName: 'Aditya',
            lastName: 'Rajput',
            username: '@adinova',
            branch: 'cse',
            year: 'third',
        },
        {
            firstName: 'Aditya',
            lastName: 'Rajput',
            username: '@adinova',
            branch: 'cse',
            year: 'third',
        }
    ],
    clubs: [
        {
            clubName: 'Ecell',
            clubAddress: 'ecell',
            members: '234'
        },
        {
            clubName: 'Qfad',
            clubAddress: 'qfrad',
            members: '24'
        },
        {
            clubName: 'Debnexus',
            clubAddress: 'debnexus',
            members: '123'
        },
        {
            clubName: 'HFC',
            clubAddress: 'hfc',
            members: '232'
        },
        {
            clubName: 'Adhyaay',
            clubAddress: 'adhyaay',
            members: '232'
        }
    ],

}

// const mapStateToProps = (state) => {
//     return{
//         authData: state.authData
//     }
// }

export default ProfilePage