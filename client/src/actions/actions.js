export function add(val) {
    return {
        type: 'ADD',
        payload: val
    }
}

export let setWallet = (data) => {
    return {
        type: 'SET_WALLET',
        payload: data
    }
}

export let setBTAdd = (add) => {
    return {
        type: 'SET_ADD',
        payload: add
    }
}