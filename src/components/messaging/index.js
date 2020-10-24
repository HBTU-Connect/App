import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import { IconButton, TextareaAutosize } from '@material-ui/core';
import {
    Send,
    Search,
    Chat,
    MoreVert
} from '@material-ui/icons'

import { getUserInfo } from '../../store/userSlice'

import userImg from '../../images/profile.jpg'
import chatBackgroundImg from '../../images/chat-background.png'


//endpoint variable for socket io
const endpoint = "http://localhost:6001"
const socket = io.connect(`${endpoint}`)



// let socketChat = io.connect(`${endpoint}/chat_message`)

const MessagingPage = () => {
    const [ msg, setMsg ] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ isTyping, setIsTyping ] = useState(false)
    const [ onlineUsers, setOnlineUsers ] = useState([])
    const [ activeUser, setActiveUser ] = useState(null)
    const [ searchValue, setSearchValue ] = useState('')

    //fetch user from store
    const user = useSelector(getUserInfo)
    useEffect(() => {
        if(user.username)
            onConnection()
        return () => {
            if(user.username)
            socket.emit("disconnection_status", user.username)
        }
    },[user.username])

    const onConnection = () => {
        const userData = {
            username: user.username
        }
        socket.emit("connection_status", userData , (data) => {
            console.log(data)
            Object.keys(data).forEach((key, index) => {
                if(data[key])
                setOnlineUsers([...onlineUsers, { username: key }])
              });
        })
        
    }


    // useEffect(() => {
    //     if(user.userId){
    //         const data = {
    //             username: user.username,
    //             userId: user.userId,
    //             online: true,
    //             name: user.firstName + " " + user.lastName
    //         }
    //         socket.emit("connected", data)
    //     }
    // }, [user.userId])

    useEffect(() => {
        getOnlineUser()
    }, [onlineUsers.length])

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

    const getOnlineUser = () => {
        socket.on("user_online", data => {
            console.log(data)
            setOnlineUsers([...onlineUsers, { username: data} ])
        })
    }

    const getMessage = () => {
        socket.on("chat_message", data => {
            // console.log(data)
            setMessages([...messages, { msg: data.msg, time: Date.now(), sender: data.sender_username }])
        })
    }

    const checkTyping = () => {
        if(msg !== ""){
            socket.on("typing", () =>{
                setIsTyping(true)
            })
        }
    }

    const handleFocus = () => {
        socket.emit("typing", 'YV is typing...')
        // console.log('typing...')
    }

    const handleSend = () => {
        if(msg !== ''){
            const data = {
                sender_id: user.userId,
                sender_username: user.username,
                receiver_username: onlineUsers[activeUser].username,
                msg: msg,
                time: Date.now()
            }
            socket.emit("chat_message", data )
            setMessages([...messages, { msg: msg, time: Date.now(), sender: user.username }])
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
                        {onlineUsers.map((user, index) => (
                            <div className='flex center margin-bottom-2' key={index} onClick={() => setActiveUser(index)} style={{ cursor: 'pointer'}}>
                                <img className='flex-column image round margin-right-2' style={{ width: '4rem', height: '4rem'}} src={userImg} alt={user.username} />
                                <div>
                                    <span className='size-1-4'>{user.username}</span>
                                    <span className='size-1-2 font-light'>{user.username}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='messaging-page__right-container chat-area'>
                    {activeUser === null && <div className='flex center' style={{ justifyContent: 'center', width: '100%', flex: "1 1 0"}}>
                        <span className='size-2-0 font-light'>Select Chat and start Messaging</span>
                    </div>}
                    {(activeUser === 0 || activeUser) && <>
                    <div className='chat-area__header'>
                        <img className='image round flex' src={userImg} alt='username' />
                        <div className='flex-column margin-right-auto'>
                            <span className='size-1-6'>{onlineUsers[activeUser].username}</span>
                            <span className='size-1-4 font-light'>{'online'}</span>
                            {isTyping && <span className='size-1-4 font-light'>typing...</span>}
                        </div>
                        <IconButton> <MoreVert fontSize='large' /> </IconButton>
                    </div>
                    <div className='chat-area__chats' style={{ backgroundImage: `url(${chatBackgroundImg})`, backgroundPosition: 'center'}}>
                        <ul>
                            {messages.map((message, index) => (<li className={message.sender === user.username ? 'mine' : 'others'} key={index} ><span > {message.msg}</span></li>))}
                        </ul>
                    </div>
                    <div className='chat-area__input flex center'>
                        <TextareaAutosize autoFocus placeholder='Type a message' name='message' className='chat-text-box' value={msg} onChange={(e) => setMsg(e.target.value)} onFocus={() => handleFocus()} rowsMin={1} rowsMax={5} />
                        <IconButton onClick={handleSend}><Send fontSize='large' /> </IconButton>
                    </div>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default MessagingPage;