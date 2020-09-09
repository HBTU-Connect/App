import React, { useState } from 'react'
import { FavoriteBorderRounded,
         ChatBubbleOutline,
         SendRounded,
         BookmarkBorderRounded,
         FavoriteRounded,
         BookmarkRounded
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const PostModel = () => {
    const [ showComment, setShowComment ] = useState(false);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ isSaved, setIsSaved ] = useState(false);

    return(
        <div className='flex-column clubs-post-model' style={{ backgroundColor : 'white', height: 'max-content', padding: '2rem'}}>
            <div className='flex' >
                <div className='flex' style={{ marginRight: '1.5rem'}}>
                    <img className='flex image round' style={{ width: '5rem', height: '5rem' }} src='https://images.unsplash.com/photo-1520004434532-668416a08753?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0Nzk0Nn0' alt='club profile' />
                </div>
                <div className='flex-column'>
                    <div className='flex center margin-bottom-1'>
                        <span className='font-black size-1-6 margin-right-half'>Ecell </span>
                        <span className='font-light size-1-4' >@ecell</span>
                        <div className='mid-dot-divider'></div>
                        <span className='font-light size-1-4'>5d</span>
                    </div>
                    <div className='flex-column font-black size-1-4 margin-bottom-2'>
                        <p className='flex margin-bottom-2' style={{ letterSpacing: ".2px", lineHeight: '1.8rem'}}>
                        It is given that the given tree is complete binary tree. For a complete binary tree, the last visited node will always be same for inorder and preorder traversal. None of the above is true even for a complete binary tree.
                        The option (a) is incorrect because the last node visited in Inorder traversal is right child and last node visited in Postorder traversal is root.
                        </p>
                        <img className='flex image' style={{ width: '100%', borderRadius: '1rem', cursor: 'zoom-in' }} src='https://images.unsplash.com/photo-1520004434532-668416a08753?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0Nzk0Nn0' alt='club profile' />
                    </div>
                    <div className='flex post-model-nav'>
                        <ul className='flex' style = {{width:'100%', listStyle: 'none', justifyContent: 'space-between'}}>
                            <li className={`post-model-nav__like flex center ${isLiked && 'active'}`} onClick={() => setIsLiked(!isLiked)} title='Like'>
                                <IconButton size='medium' >{isLiked ? <FavoriteRounded fontSize='large' />  :<FavoriteBorderRounded fontSize='large' /> } </IconButton>
                                <span className='size-1-4' style={{ marginLeft: '.3rem'}}>234</span>
                            </li>
                            <li className='post-model-nav__comment flex center' title='Comment' >
                                <IconButton onClick={() => setShowComment(!showComment)} size='medium' ><ChatBubbleOutline fontSize='large' /></IconButton>
                                <span className='size-1-4' style={{ marginLeft: '.3rem'}}>34</span>
                            </li>
                            <li className='post-model-nav__send flex center' title='Send'>
                                <IconButton size='medium' ><SendRounded fontSize='large' /></IconButton>
                            </li>
                            <li className={`post-model-nav__save flex center ${isSaved && 'active'}`} title='Save'>
                                <IconButton onClick={() => setIsSaved(!isSaved)} size='medium' >{isSaved? <BookmarkRounded fontSize='large' />:<BookmarkBorderRounded fontSize='large' />}</IconButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {showComment && <div className='flex-column'>
                </div>}
        </div>
    )
}

export default PostModel;