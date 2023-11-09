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

    case "USER_TOKEN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "USER_TOKEN_FAILURE":
      console.error("Error retrieving user data by token:", action.payload);
      return state;

    case "LOGOUT":
      localStorage.removeItem('authToken');
      return {
        ...state,
        currentUser: {},
      };

    case "SET_USER":
      console.log("we are here")
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
}
