import { createStore, combineReducers, applyMiddleware } from 'redux';

const reducer = (state = {
    userName: '',
    num: 1,
    coll: []
}, action) => {
    switch(action.type){
        case 'ADD':
            state = {
                ...state,
                num: state.num + action.payload,
                coll: [...state.coll, action.payload]
            }
            break;
        case 'SUB':
            state = {
                ...state,
                num: state.num + action.payload,
                coll: [...state.coll, action.payload]
            }
            break;
    }
    return state
}

const reducer2 = (state = {
    userName: '',
    num: 1,
    coll: []
},action) => {
    switch(action.type){
        case 'SET_NAME':
            state = {
                ...state,
                userName: action.payload
            }
            break;
    }
    return state;
}

const myLogger = (store)=>{
    return (next)=>{
        return (action)=>{
            console.log('State Changed', action)
            next(action)
        }
    }   
}

const initialState = {
    userName: '',
    num: 1,
    coll: []
}

const store = createStore(combineReducers({reducer, reducer2}), {}, applyMiddleware(myLogger))

store.subscribe(()=>{
    //console.log('Store updated ', store.getState())
})

store.dispatch({
    type: 'ADD',
    payload: 5
})

store.dispatch({
    type: 'SUB',
    payload: 2
})

store.dispatch({
    type: 'SET_NAME',
    payload: 'Ephraim'
})
