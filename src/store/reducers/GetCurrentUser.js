const INITIAL_VALUE = {
    currentUser: "",
  };
  
  export default function GetCurrentUserReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
      case "GET_USER":
        return {
          ...state,
          currentUser: action.payload,
        };
  
      default:
        return state;
    }
    
  }