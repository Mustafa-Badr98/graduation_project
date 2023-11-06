const INITIAL_VALUE = {
  currentUser: {},
};

export default function GetCurrentUserReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "GET_USER_SUCCESS":
      console.log("User data retrieved successfully");
      return {
        ...state,
        currentUser: action.payload,
      };

    case "GET_USER_FAILURE":
      console.error("Error retrieving user data:", action.payload);
      return state;

    case "LOGOUT":
      console.log("we are here")
      return {
        ...state,
        currentUser: {},
      }; 

    default:
      return state;
  }
}
