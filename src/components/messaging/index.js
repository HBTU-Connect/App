import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { TextField, IconButton, TextareaAutosize } from '@material-ui/core';
import {
    Send,
    Search,
    Chat,
    MoreVert
} from '@material-ui/icons'

import userImg from '../../images/profile.jpg'
import chatBackgroundImg from '../../images/chat-background.png'


//endpoint variable for socket io
const endpoint = "http://localhost:5000"

let socket = io.connect(`${endpoint}`)

const MessagingPage = () => {
    const [ msg, setMsg ] = useState('')
    const [ messages, setMessages ] = useState(['Welcome to the chat'])
    const [ isTyping, setIsTyping ] = useState(false)
    const [ searchValue, setSearchValue ] = useState('')

    // useEffect(() => {
    //     socket.emit('connected', 'Yv connected')
    // }, [])

    useEffect(() => {
        getMessage()
    }, [messages.length])

    useEffect(() =>{
        if(isTyping){
            console.log('typing...')
            setTimeout(() => {
                setIsTyping(false)
            }, 3000)
        }
        else{
            checkTyping()
        }
    }, [isTyping])

    const getMessage = () => {
        socket.on("message", msg => {
            console.log(msg)
            setMessages([...messages, msg])
        })
    }

    const checkTyping = () => {
        socket.on("typing", () =>{
            setIsTyping(true)
        })
    }

    const handleFocus = () => {
        socket.emit("typing", 'YV is typing...')
        // console.log('typing...')
    }

    const handleSend = () => {
        if(msg !== ''){
            socket.emit("message", msg)
            setMsg('')
        }
    }

    return(
        <div className='body-container messaging'>
            <div className='messaging-page'>
                <div className='messaging-page__left-container chat-list'>
                    <div className='chat-list__header'>
                        <img className='flex image round' src={userImg} alt='username' />
                        <IconButton> <Chat fontSize='large' /> </IconButton>
                        <IconButton> <MoreVert fontSize='large' /> </IconButton>
                    </div>
                    <div className='chat-list__search'>
                        <div className='chat-list__search__input-container'>
                            <Search fontSize='large' />
                            <input name='search' placeholder='Search here' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </div>
                    </div>
                    <div className='chat-list__list'>

                    </div>
                </div>
                <div className='messaging-page__right-container chat-area'>
                    <div className='chat-area__header'>
                        <img className='image round flex' src={userImg} alt='username' />
                        <div className='flex-column margin-right-auto'>
                            <span className='size-1-6'>Yashveer Talan</span>
                            {isTyping && <span className='size-1-4 font-light'>typing...</span>}
                        </div>
                        <IconButton> <MoreVert fontSize='large' /> </IconButton>
                    </div>
                    <div className='chat-area__chats' style={{ backgroundImage: `url(${chatBackgroundImg})`, backgroundPosition: 'center'}}>
                        <ul>
                            {messages.map((message, index) => (<li key={index} ><span> {message}</span></li>))}
                        </ul>
                    </div>
                    <div className='chat-area__input flex center'>
                        <TextareaAutosize autoFocus placeholder='Type a message' name='message' className='chat-text-box' value={msg} onChange={(e) => setMsg(e.target.value)} onFocus={() => handleFocus()} rowsMin={1} rowsMax={5} />
                        <IconButton onClick={handleSend}><Send fontSize='large' /> </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagingPage;