const  rootReducer = (state = {
    num: 1,
    wallet: {
        balance: 0
    },

}, action) => {
    switch(action.type){
        case 'ADD':
            state = {
                ...state,
                num: state.num + action.payload
            }
            break;
        case 'SET_WALLET':
            console.log(action.payload.balance)
            state = {
                ...state,
                wallet: action.payload
            }
            break;
        case 'SET_ADD':
            state = {
                ...state,
                BTAdd: action.paload
            }
        default:
            console.log('Unknown action type ', action.type);
    }
    return state
}

export default rootReducer;
