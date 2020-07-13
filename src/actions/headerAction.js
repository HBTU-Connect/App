export const headerDisplay = value => dispatch => {
    dispatch({
        type: 'HEADER_DISPLAY',
        payload: value
    })
    return true
}