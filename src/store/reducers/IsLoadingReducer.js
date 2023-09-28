const INITIAL_VALUE = {
  isLoading: false,
};

export default function IsLoadingReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}
