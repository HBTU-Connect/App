import React from 'react'
import { Chip, Avatar } from '@material-ui/core'
import { Person as PersonIcon } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: '0.5rem'
    },
  }));

const QuestionCard = (props) =>{
    const classes = useStyles();

    return(
        <div className='card card-question'>
            <div className='card-tags tags-container question-tags'>
                <Chip variant='outlined'  size='small' label='Pyhton' avatar={<Avatar>#</Avatar>} />
                <Chip variant='outlined'  size='small' label='Computer' avatar={<Avatar>#</Avatar>} />
                <Chip variant='outlined'  size='small' label='Program' avatar={<Avatar>#</Avatar>} />
                <Chip variant='outlined'  size='small' label='Coding' avatar={<Avatar>#</Avatar>} />
            </div>
            <div className='question-asker question-username'>
                <Avatar className={classes.small}><PersonIcon /></Avatar>
                <span>Yashveer</span> asked
            </div>
            <div className='card-title question-title'>
                Why can't Python set the Excel print area on a VM without open RDP connection?
            </div>
            <div className='card-footer question-details'>
                <div className='question-details__upvotes'>
                    <span className='question-details__count'>3</span>
                    <span className='question-details__title'>Upvotes</span>
                </div>
                <div className='question-details__answers'>
                    <span className='question-details__count'>2</span>
                    <span className='question-details__title'>Answers</span>
                </div>
                <div className='question-details__views'>
                    <span className='question-details__count'>101</span>
                    <span className='question-details__title'>Views</span>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard