// const state = {}

export const userReducer = (state = {}, action) => {
    switch(action.type){
        case 'ADD_DATA':
            return state ={...state, data: action.payload, hadFilledForm: true };
        case 'ERROR':
            return state={...state, error: action.payload};
        default:
            return state;
    }
}

export const authReducer= (state ={}, action) => {
    switch(action.type){
        case 'SIGN_UP':
            return state ={...state, signUpData: action.payload, msg: 'Success', error: null}
        case 'LOGIN':
            return state ={...state, loginData: action.payload, msg: 'Success', error: null}
        case 'ERROR':
            return state={...state, error: action.payload, msg: 'error'};
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