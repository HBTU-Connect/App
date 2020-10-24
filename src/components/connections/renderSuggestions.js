import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const ColorPrimaryButton = withStyles((theme) => ({
    root: {
        color: 'rgb(0, 88, 136)',
        borderColor: 'rgb(0, 88, 136)',
        '&:hover': {
        backgroundColor: 'rgb(204, 238, 255)',
        },
    },
}))(Button);

const RenderSuggestions = () => {
    
    return (
        <div>
            Suggestions
        </div>
    )
}

export default RenderSuggestions;