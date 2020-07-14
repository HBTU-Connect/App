// const state = {}

export const userReducer = (state = {}, action) => {
    switch(action.type){
        case 'ADD_DATA':
            return state ={...state, data: action.payload, hadFilledForm: true };
        default:
            return state;
    }
}

export const authReducer= (state ={}, action) => {
    switch(action.type){
        case 'SIGN_UP':
            return state ={...state, data: action.payload, type: 'signup', msg: 'Success'}
        case 'LOGIN':
            return state ={...state, data: action.payload, type: 'login', msg: 'Success', isLoggedIn: true}
        case 'LOGOUT':
            return state = { ...state, data: action.payload, type: 'logout', msg: 'Success', isLoggedIn: false}
        case 'ERROR':
            return state={...state, data: action.payload, type: 'error', msg: 'error'};
        default:
            return state
    } 
}

export const UIReducer = (state ={}, action) => {
    switch(action.type){
        case 'HEADER_DISPLAY':
            return state ={ ...state, displayHeader: action.payload };
        default:
            return state;
    }
}