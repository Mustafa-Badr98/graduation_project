const INITIAL_VALUE = {
    flag: 0,
  };
  
  export default function FLagReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
      case "CHANGE_FLAG":
        return {
          ...state,
          flag: action.payload,
        };
  
      default:
        return state;
    }
  }
  