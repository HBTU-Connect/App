export const authReducer = (state={}, action) => {
    switch(action.type){
        case 'ADD_DATA':
            return state ={ data: action.payload};
        case 'ERROR':
            return state={  error: action.payload};
        default:
            return state;
    }
}