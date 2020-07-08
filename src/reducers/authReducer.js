// const state = {}

export const authReducer = (state = {}, action) => {
    switch(action.type){
        case 'ADD_DATA':
            return state ={...state, data: action.payload, hadFilledForm: true };
        case 'ERROR':
            return state={ error: action.payload};
        default:
            return state;
    }
}

export const UIReducer = (state = {}, action) => {
    switch(action.type){
        case 'HEADER_DISPLAY':
            return state ={ ...state, displayHeader: action.payload };
        default:
            return state;
    }
}