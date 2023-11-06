const INITIAL_VALUE = {
    token: "",
  };
  
  export default function StoreTokenReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
      case "STORE_TOKEN":
        return {
          ...state,
          token: action.payload,
        };
     
      default:
        return state;
    }
  }
  