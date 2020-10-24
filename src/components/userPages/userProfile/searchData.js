import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { IconButton } from '@material-ui/core'
import { Search, Close, Loyalty, Album, Movie, MenuBook } from '@material-ui/icons'
import axios from 'axios'

import { hobbies } from './utils/hobbies'
import { ChasingDotsSpinner } from '../../utils/loadingSpinner'

const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

const SearchData = ({name, portalRef, setDisplayPortal, sectionData, setSectionData}) => {
    const [ value, setValue ] = useState('')
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if(name === 'interests')
            setData(hobbies)
        setLoading(false)
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value)
        if(name === 'interests'){
            handleInterestSearch(e.target.value, setData)
        }
    }

    const handleSearch =() => {
        if(name === 'interests'){
            handleInterestSearch(value, setData)
        }
        if(name === 'music'){
            setLoading(true)
            handleMusicSearch(value, setData, setLoading)
        }
        if(name === 'movies' ){
            setLoading(true)
            handleMoviesSearch(value, setData, setLoading)
        }

        if(name === 'tvSeries'){
            setLoading(true)
            handleTvSearch(value, setData, setLoading)
        }

        if(name === 'books'){
            setLoading(true)
            handleBookSearch(value, setData, setLoading)
        }

        if(name === 'coverImage'){
            setLoading(true)
            handleImageSearch(value, setData, setLoading)
        }
    }

    const handleCardClick = (value) => {
        setDisplayPortal(false)
        setSectionData([...sectionData, value])
    }

    return(
        <Portal>
            <div ref={portalRef} className='portal-container'>
                <div className='portal search-data'>
                    <div className='search-data__header flex center'>
                        <span className='size-1-6 weight-500 capitalize'>Search {name}</span>
                        <div className='flex center'>
                            <input className='search-data__input' autoFocus type='text' value={value} placeholder='Search' onChange={(e) => handleChange(e)} onKeyDown={(e) => {if(e.keyCode === 13)handleSearch()}} />
                            <IconButton onClick={handleSearch}><Search fontSize='large' /> </IconButton>
                        </div>
                        <IconButton onClick={() => setDisplayPortal(false)}><Close fontSize='large' /> </IconButton>
                    </div>
                    <div className={`search-data__content ${name=== 'coverImage' ? 'image-grid-view' : 'normal-grid-view'}`}>
                        {loading && <div className='loader'><ChasingDotsSpinner /></div> }
                        {!loading && data.length === 0 && <span className='font-light size-1-4'>No result, try another keyword</span>}
                        {!loading && name === 'interests' && data.length > 0 && data.map((item, index) => {
                            return(
                                <div key={index} onClick={() => {handleCardClick(item)}} className='search-data__card'>
                                    <div className='search-data__card__icon'>
                                        <Loyalty />
                                    </div>
                                    <span className='size-1-6 weight-500 margin-bottom-2'>{item} </span>
                                </div>
                            )
                        })}
                        {!loading && name === 'music' && data.length > 0 && data.map((item, index) => {
                            return(
                                <div key={index} onClick={() => {handleCardClick(item)}} className='search-data__card'>
                                    {item.track && item.track.images ? <img src={item.track.images.coverart} alt='poster' />: <div className='search-data__card__icon'><Album /></div> }
                                    <span className='size-1-6 font-black weight-500 margin-bottom-half'>{item.track.title}</span>
                                    <span className='s-ze-1-2 font-light margin-bootom-2'>{item.track.subtitle}</span>
                                </div>
                            )
                        })}
                        {!loading && (name === 'movies') && data.length > 0 && data.map((item, index) => {
                            return(
                                <div key={index} onClick={() => {handleCardClick(item)}} className='search-data__card'>
                                    {item.image  ? <img src={item.image} alt='poster' />: <div className='search-data__card__icon'><Movie /></div> }
                                    <span className='size-1-6 font-black weight-500 margin-bottom-half'>{item.title}</span>
                                    {/* <span className='s-ze-1-2 font-light margin-bootom-2'>{item.track.subtitle}</span> */}
                                </div>
                            )
                        })}
                        {!loading && ( name === 'tvSeries') && data.length > 0 && data.map((item, index) => {
                            return(
                                <div key={index} onClick={() => {handleCardClick(item)}} className='search-data__card'>
                                    {item.image_thumbnail_path  ? <img className='tv-series' src={item.image_thumbnail_path} alt='poster' />: (item.image ?  <img src={item.image} alt='poster' /> : <div className='search-data__card__icon'><Movie /></div> )}
                                    <span className='size-1-6 font-black weight-500 margin-bottom-half'>{item.name ? item.name : item.title}</span>
                                    {item.network && <span className='size-1-2 font-light margin-bootom-2'>{item.network}</span>}
                                </div>
                            )
                        })}
                        {!loading && ( name === 'books') && data.length > 0 && data.map((item, index) => {
                            return(
                                <div key={index} onClick={() => {handleCardClick(item)}} className='search-data__card'>
                                    {item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail  ? <img className='tv-series' src={item.volumeInfo.imageLinks.smallThumbnail} alt='poster' />: <div className='search-data__card__icon'><MenuBook /></div> }
                                    <span className='size-1-4 font-black weight-400 margin-bottom-half'>{item.volumeInfo.title}</span>
                                    <span className='size-1-2 font-light margin-bootom-2 flex-column'>{item.volumeInfo.authors.map((author, index) => (<span key={index}>{author}</span>))}</span>
                                </div>
                            )
                        })}
                        {!loading && ( name === 'coverImage') && data.length > 0 && data.map((item, index) => {
                            return <ImageCard key={index} setDisplayPortal={setDisplayPortal} setSectionData={setSectionData} item={item} />
                        })}
                    </div>
                </div>
            </div>
        </Portal>
    )
}

const ImageCard = ({ item, setSectionData, setDisplayPortal }) => {
    const [ span, setSpan ] = useState(0)
    const imageRef = useRef(null)

    useEffect(() => {
        imageRef.current.addEventListener('load', countSpan)
    })

    const countSpan = () => {
            if(imageRef.current && imageRef.current.clientHeight){
            const height = imageRef.current.clientHeight
            const spans = Math.ceil(height/10 +1)
            setSpan(spans)
        }
    }

    const handleClick = () => {
        let url = `${item.urls.full}?auto=compress&w=900&h=300&fit=crop`
        setSectionData(url);
         setDisplayPortal(false)
    }

    return(
        <div key={item.id} onClick={() => handleClick()} style={{ gridRowEnd: `span ${span}`, cursor: 'pointer'}}>
            <img ref={imageRef} className='unsplash-image' src={item.urls.regular} alt='unsplash' /> 
        </div>
    )
}

const handleInterestSearch = (value, setData) => {
    // console.log(value)
    // let value = value
    let searchData = []
    hobbies.forEach((hobby, index) => {
        if(hobby.toLowerCase().includes(value.toLowerCase())){
            // console.log(hobby)
            searchData.push(hobby)
        }
    })
    // console.log(searchData)

    setData(searchData)
}

const handleMusicSearch = async (value, setData, setLoading) => {
    value.replace(' ', '%20')

    try{
        const response = await axios.get(`https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=${value}`, {
            headers: {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "ce5b27aa07msh734b12c439559d8p117ecbjsn415afbf5e0f6"
            }
        })
        // console.log(response)
        const data = response.data.tracks.hits
        setData([...data])
        setLoading(false)
        
    }
    catch(error){
        console.log(error)
    }
}

const handleMoviesSearch = async (value, setData, setLoading) => {
    value.replace(' ', '%2520')

    try{
        const response = await axios.get(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${value}`, {
            headers: {
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "ce5b27aa07msh734b12c439559d8p117ecbjsn415afbf5e0f6"
            }
        })
        console.log(response)
        const data = response.data.titles
        setData([...data])
        setLoading(false)
        
    }
    catch(error){
        console.log(error)
    }
}

const handleTvSearch = async (value, setData, setLoading) => {
    value.replace(' ', '%20')

    try{
        const response = await axios.get(`https://www.episodate.com/api/search?q=${value}&page=1`)
        console.log(response)
        const data = response.data.tv_shows
        setData([...data])
        if(response.data.tv_shows.length > 0)
            setLoading(false)
        const response2 = await axios.get(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${value}`, {
            headers: {
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "ce5b27aa07msh734b12c439559d8p117ecbjsn415afbf5e0f6"
            }
        })
        console.log(response2)
        const data2 = response2.data.titles
        setData([...data, ...data2])
        setLoading(false)
        
    }
    catch(error){
        console.log(error)
    }
}

const handleBookSearch = async (value, setData, setLoading) => {
    value.replace(' ', '%20')

    try{
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
        console.log(response)
        const data = response.data.items
        setData([...data])
        setLoading(false)
        
    }
    catch(error){
        console.log(error)
    }
}

const handleImageSearch = async (value, setData, setLoading) => {
    value.replace(' ', '%20')
    const clientId = 'OFbO6Bz6xcE4kpALGhfqomzPXdikja5gQPKhtEAA9kA'
    try{
        const response = await axios.get(`https://api.unsplash.com/search/photos?client_id=${clientId}&page=1&query=${value}`)
        console.log(response)
        const data = response.data.results
        setData([...data])
        setLoading(false)
        
    }
    catch(error){
        console.log(error)
    }
}



export default SearchData