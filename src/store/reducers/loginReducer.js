const INITIAL_VALUE = {
  isLogedIn: false,
};

export default function LogReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogedIn: false,
      };
    default:
      return state;
  }
}
