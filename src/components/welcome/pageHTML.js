import React from 'react';
import { Link } from 'react-router-dom';

//images
import studentsImage from '../../images/students.png';
import joinImage from '../../images/dive.png';
import postImage from '../../images/post.png';
import chatImage from '../../images/chatting.png';
import askImage from '../../images/ask.png';
import clubImage from '../../images/club.png'

const PageHTML = () => {
    return(
        <>

            <div className='section_two'>
                <div className='section_two-content'>
                    <div className='section_two-heading'>
                        <div className='section_two-heading-primary'>
                            Connecting Mates
                        </div>
                        <div className='divider'></div>
                        <div className='section_two-heading-secondary'>
                            Join the community and Grow your connections in the College.
                        </div>
                    </div>
                    <img src={studentsImage} alt='students'/>
                    
                </div>
            
            </div>
            <div className='section_three'>
                <div className='cards'>
                    <div className= 'card-1-of-3'>
                        <div className='card-image'>
                            <img src={postImage} alt='post Icon' />
                        </div>
                        <div className='card-heading'>
                            Add Posts
                        </div>
                        <div className='card-content'>
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and 
                            publishing industries for previewing layouts and visual mockups.
                        </div>
                    </div>
                    <div className='card-1-of-3'>
                        <div className='card-image'>
                            <img src={chatImage} alt='chat Icon' />
                        </div>
                        <div className='card-heading'>
                        Chat
                        </div>
                        <div className='card-content'>
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and 
                            publishing industries for previewing layouts and visual mockups.  
                        </div>
                    </div>
                    <div className='card-1-of-3'>
                        <div className='card-image'>
                            <img src={askImage} alt='Ask Icon' />
                        </div>
                        <div className='card-heading'>
                            Ask
                        </div>
                        <div className='card-content'>
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and 
                            publishing industries for previewing layouts and visual mockups.
                        </div>
                    </div>
                </div>
            </div>

            <div className='section_four'>
                <div className='section_four-content'>
                    <img src={clubImage} alt='club icon' />
                    <div className='section_four-heading'>
                        <div className='section_four-heading-primary'>
                            Clubs
                        </div>
                        <div className='divider'></div>
                        <div className='section_four-heading-secondary'>
                            You can find all our College Clubs here. 
                            And become a member
                        </div>
                    </div>
                </div>
            </div>

            <div className='section_five'>
                <div className='section_five-content'>
                    <img src={joinImage} alt='join' />
                    <div className='section_five-heading'>
                        Dive into the World of HBTU Connect.
                        <Link to='/joinus' className='link'><button> Join Now </button></Link>
                    </div>
                </div> 

            </div>
        </>
    );
}

export default PageHTML;