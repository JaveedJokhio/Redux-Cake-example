const redux = require('redux');// importing redux
const createStore = redux.createStore; //creating Store
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers //Used when we have multiple reducers

//************action*********

//making variables so spelling mistakes will not happen
// FOR CAKES 
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
// FOR ICECREAMS
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//Action Functios

//FOR CAKES
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}
//FOR ICECREAM
function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}
function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}
//state
//state has to be a single object with numeric value
//for single state >

// const initialState ={
//     numofCake:10,
//     numofIceCreams:20
//    }

//lets define multiple initial states for multiple reducers

const initialCakeState = {
    numofCake: 10
}
const initialIceCreamState = {
    numofIceCreams: 20
}

//Reducer take previousState & action and returns a newState

//**********MULTIPLE reducerS********
//first reducer
const CakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numofCake: state.numofCake - 1,
            };
        case CAKE_RESTOCKED:
            return {
                ...state,
                numofCake: state.numofCake + action.payload,
            }
        default:
            return state; // Return the current state for unknown actions
    }
};
//second reducer
const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numofIceCreams: state.numofIceCreams - 1,
            };
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numofIceCreams: state.numofIceCreams + action.payload,
            }
        default:
            return state; // Return the current state for unknown actions
    }
};

//************reducers end************ */

//The store will take only one parameter as reducer so we have to combine multiple reducers to one as root reducer
const rootReducer = combineReducers({
    cake: CakeReducer,
    iceCream: IceCreamReducer
})

//now store will accept root reducer as argument
const store = createStore(rootReducer);
console.log("initial state", store.getState())

const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()));

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

// instead of calling everytime dispatch, we use helper funtions in redux bindActionCreators to bind actions with dispatch

const actions = bindActionCreators({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch)

//to run dispatch & action
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(1)


unsubscribe();