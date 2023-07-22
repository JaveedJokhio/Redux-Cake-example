
const redux = require('redux');
const createStore = redux.createStore;
//************action*********

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

function orderCake (){
    return{
        type: CAKE_ORDERED,
        payload: 1  
}  
}

function restockCake(qty = 1){
    return{
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}
//state
//state has to be a single object with numeric value
const initialState ={
    numofCake:10
   }
//Reducer take
// (previousState,action)=> newState
//**********reducer********

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CAKE_ORDERED:
        return {
          ...state,
          numofCake: state.numofCake - 1, 
        };
    case CAKE_RESTOCKED:
        return{
            ...state,
            numofCake: state.numofCake + action.payload,
        }
      default:
        return state; // Return the current state for unknown actions
    }
  };
  
const store = createStore(reducer);
console.log("initial state",store.getState())

const unsubscribe = store.subscribe(()=> console.log('updated state', store.getState()));

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))

unsubscribe();


 


